#!/usr/bin/env python3
"""Run from anywhere: python3 /path/to/project/scripts/preview.py."""
import argparse
import functools
import json
import os
from pathlib import Path
import subprocess
import threading
import time
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / '.preview'
DEPENDENCIES = ROOT / '.preview-gems'
ENV = dict(os.environ, GEM_HOME=str(DEPENDENCIES), GEM_PATH=str(DEPENDENCIES))
RENDERER = ROOT / 'scripts' / 'render_preview.rb'
stop = threading.Event()


def build():
    result = subprocess.run(['ruby', str(RENDERER), str(OUTPUT)],
                            cwd=ROOT, env=ENV,
                            capture_output=True, text=True)
    if result.returncode:
        print('预览生成失败，保留上次页面。修正文件后会自动重试。', flush=True)
        print(result.stderr.strip(), flush=True)
        return False
    print(f'[{time.strftime("%H:%M:%S")}] 页面已更新', flush=True)
    return True


def snapshot():
    paths = [ROOT / 'index.md', ROOT / '_config.yml', ROOT / 'resume.pdf', RENDERER]
    for folder in ('_includes', '_layouts', '_data', '_sass', 'assets'):
        paths.extend(p for p in (ROOT / folder).rglob('*') if p.is_file())
    state = {}
    for path in paths:
        try:
            stat = path.stat()
            state[str(path)] = (stat.st_mtime_ns, stat.st_size)
        except FileNotFoundError:
            pass
    return state


def watch(previous):
    pending = None
    while not stop.wait(0.25):
        current = snapshot()
        if current != previous:
            previous = current
            pending = time.monotonic()
        elif pending is not None and time.monotonic() - pending >= 0.3:
            build()
            pending = None


class Handler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

    def do_GET(self):
        if self.path.split('?')[0] == '/__preview/version':
            try:
                revision = json.loads((OUTPUT / 'revision.json').read_text())['revision']
            except (OSError, ValueError, KeyError):
                revision = None
            payload = json.dumps({'revision': revision}).encode()
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Content-Length', str(len(payload)))
            self.end_headers()
            self.wfile.write(payload)
        else:
            super().do_GET()

    def log_message(self, format, *args):
        # Polling the revision every second should not flood the terminal.
        if self.path.split('?')[0] != '/__preview/version':
            super().log_message(format, *args)


def main():
    parser = argparse.ArgumentParser(description='自动监听并预览个人学术主页')
    parser.add_argument('--port', type=int, default=4173)
    parser.add_argument('--build-only', action='store_true')
    args = parser.parse_args()
    initial = snapshot()
    if not build():
        print('如缺少依赖，请运行：', flush=True)
        for name, version in [('liquid', '4.0.4'), ('kramdown', '1.17.0'), ('sass', '3.4.25')]:
            print(f'gem install {name} -v {version} --install-dir "{DEPENDENCIES}" --no-document', flush=True)
        return 1
    if args.build_only:
        return 0
    try:
        server = ThreadingHTTPServer(('127.0.0.1', args.port),
                                     functools.partial(Handler, directory=str(OUTPUT)))
    except OSError as error:
        print(f'无法启动预览：{error}。请关闭旧预览，或使用 --port 4174。', flush=True)
        return 1
    threading.Thread(target=watch, args=(initial,), daemon=True).start()
    print(f'预览：http://127.0.0.1:{args.port}/\n保存文件后自动生成、自动刷新。按 Ctrl+C 停止。', flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        stop.set()
        server.server_close()
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
