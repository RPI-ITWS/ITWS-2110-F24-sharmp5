Pranay Sharma
Dr. Callahan
WebSystems Development
Lab 5 Readme
11/7/2024

VM Security Setup
This README documents the security measures implemented on the VM in line with the CSA Security Guidance v5, as well as HTTPS setup to secure data in transit. The measures include enabling automatic security updates, configuring firewall protection, enabling logging and monitoring, and setting up automated vulnerability scanning.

Table of Contents
Installing HTTPS Certificate
Enabling Automatic Security Updates
Configuring UFW Firewall
Enabling Logging and Monitoring
Automated Vulnerability Scanning
Installing HTTPS Certificate
To secure web traffic to the VM, we’ll install an HTTPS certificate using Let’s Encrypt and Certbot with Apache.

Steps to Install HTTPS Certificate
Update Package List:

sudo apt update
Install Certbot:

sudo apt install certbot python3-certbot-apache -y
Obtain and Install the Certificate:

sudo certbot --apache -d yourdomain.com -d www.yourdomain.com
Verify HTTPS:

Access your website at https://yourdomain.com in a browser to confirm HTTPS is enabled.
Set Up Automatic Renewal:

sudo systemctl status certbot.timer
Manually Test Renewal (optional):

sudo certbot renew --dry-run
Benefits
Data Protection: Encrypts data in transit, ensuring secure communication.
CSA Compliance: Aligns with CSA’s requirement for protecting data in transit.
Enabling Automatic Security Updates
Automatic security updates help ensure that critical patches are applied without needing manual intervention, reducing the risk of vulnerabilities.

Steps to Enable Automatic Security Updates
Install Unattended Upgrades:

sudo apt-get install unattended-upgrades
Configuration (Optional):

Additional configuration options are available in /etc/apt/apt.conf.d/50unattended-upgrades if you want to customize the update settings.
Enable the Service (if not already enabled):

sudo dpkg-reconfigure --priority=low unattended-upgrades
Benefits
Automated Security: Ensures critical security updates are automatically applied, enhancing system security.
CSA Compliance: Addresses CSA’s best practices for patch management.
Configuring UFW Firewall
A firewall restricts access to the VM, allowing only authorized traffic and protecting against unauthorized access.

Steps to Enable UFW Firewall
Enable UFW:

sudo ufw enable
Allow SSH Connections:

To prevent disconnection, ensure SSH is allowed before enabling:

sudo ufw allow OpenSSH
Set Additional Rules (Optional):

Allow HTTP and HTTPS traffic if your VM hosts a web server:

sudo ufw allow http
sudo ufw allow https
Check Status:

sudo ufw status
Benefits
Access Control: Limits access to necessary services, reducing the attack surface.
CSA Compliance: Implements network security measures as per CSA guidelines.
Enabling Logging and Monitoring
Logging and monitoring provide visibility into system activities, helping to detect unauthorized access and troubleshoot issues.

Steps to Enable Logging and Monitoring
Enable System Logs:

Authentication Logs:
bash
tail -f /var/log/auth.log
General System Logs:
bash
tail -f /var/log/syslog
Install and Use htop for Real-Time Monitoring:

sudo apt install htop
Run htop to monitor system metrics:

htop
Enable UFW Firewall Logging:

sudo ufw logging on
Leverage Apache Access Logs: Apache generates access logs by default, located in /var/log/apache2/access.log:

tail -f /var/log/apache2/access.log
Benefits
Improved Visibility: Logs enable auditing and investigation of unusual activity.
CSA Compliance: Meets CSA’s guidelines for monitoring and visibility.
Automated Vulnerability Scanning
Regular vulnerability scanning was implemented to identify and mitigate security weaknesses on the VM, following CSA’s best practices for vulnerability management.

Steps to Implement Automated Vulnerability Scanning with Lynis
Install Lynis:

sudo apt update
sudo apt install lynis -y
Run an Initial System Audit:

sudo lynis audit system
Automate Weekly Scans: Schedule a cron job to perform regular scans every Sunday at 2 a.m.

sudo crontab -e
Add the following line to schedule the weekly scan:

plaintext
0 2 * * 0 /usr/sbin/lynis audit system --quiet
Review and Act on Scan Results: After each scan, check for high-priority vulnerabilities and address them as needed.

Benefits
Continuous Improvement: Regular scans help proactively identify and fix vulnerabilities.
CSA Compliance: Aligns with CSA guidelines for continuous monitoring and vulnerability management.