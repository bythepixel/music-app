# Cold Provisioning and First-Time Deploying CloneCubicles Application

## Provisioning

### Create a New Amazon EC2 Instance
- Log in to the Amazon Console
- Services > EC2 > Instances
- Click Launch Instance
- Select **Ubuntu** Server
- Select **t2.micro** Type > Next: Configure Instance Details
- Check **Protect against accidental termination** > Next: Add Storage
- Leave as default > Next: Add Tags
- Leave as default > Next: Configure Security Group
- Click **Select an existing security group**. Choose **Basic Webserver** > Review and Launch
- Click Launch > Choose an existing key pair. Select yours. If not added, talk to someone with ability to add new SSH key pairs. Click Launch Instances. Navigate back to the Instances view

### SSHing into Server and Provisioning
- Ensure you can SSH into the server by navigating to your terminal and running:
  `ssh ubuntu@<public_ip>`. You can get the public IP by selecting the EC2 instance from the Intances view on the Amazon console
- Exit the SSH session
- Navigate to the clonecubicles project root from the command line
- Copy the provisioning folder by running the following command:
  `scp -rp ./provisioning ubuntu@<public_ip>:/home/ubuntu/provisioning`
- `ssh ubuntu@<public_ip>`
- `cd /home/ubuntu/provisioning`
- Run the provisioning script by `./provision.sh staging` for staging or `./provision.sh production` for production
- Ensure the process completes successfully
- `cd /srv/www; git status`. You should see:
  ```
  On branch master

  Initial commit

  nothing to commit (create/copy files and use "git add" to track)
  ```
- Exit out of the SSH session

## Deployment

### Add the Staging/Production Remote
- Ensure you can ssh into the remote as deployer by `ssh deployer@<public_ip>`
- `cd /srv/www`
- Create the `.env` file and populate with the necessary key/values. Save and exit
- Exit the ssh session
- Navigate to the project root
- run `git remote -v`
- If you see the remote you need to add, run `git remote rm <remote_name>` otherwise continue to the new step
- Add the git remote via `git remote add <remote_name> deployer@<public_ip>:/srv/www`

### Deploy the Latest Master to Remote
- Push the latest `master` branch to the remote by running `git push <remote_name> master:master`
- After the first deploy, the queue will be started automatically by the post-receive hook.

### Update the ENV Configuration
- SSH into the server as deployer this time with `ssh deployer@<public_ip>`
- `cd /srv/www`
- Edit the `.env` file and replace the config with the necessary environment configuration. Save. Exit
- Visit the `<public_ip>` and ensure the site is up and working
