from pydaffodil import Daffodil

cli = Daffodil(remote_user="root", remote_host="203.161.53.228", remote_path="/production/micro-services/phaddress")

steps = [
    {"step": "Build the project", "command": lambda: cli.run_command("npm run build")},
    {"step": "Stop backend process on remote server", "command": lambda: cli.transfer_files("build","/root/production/micro-services/phaddress")},
    {"step": "Restart backend process on remote server", "command": lambda: cli.ssh_command("sudo pm2 restart phaddress")}
]
cli.deploy(steps)