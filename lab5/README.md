Pranay Sharma
Dr. Callahan
WebSystems Development
Lab 5 Readme
11/7/2024

Installing HTTPS Certificate
To secure web traffic to the VM, we’ll install an HTTPS certificate using Let’s Encrypt and Certbot with Apache.

Steps to Install HTTPS Certificate
Update Package List:

bash
Copy code
sudo apt update
Install Certbot: Install Certbot for Apache:

bash
Copy code
sudo apt install certbot python3-certbot-apache -y
Obtain and Install the Certificate: Run Certbot to automatically obtain and configure the certificate. Replace yourdomain.com with your actual domain name.

bash
Copy code
sudo certbot --apache -d yourdomain.com -d www.yourdomain.com //the azure VM domaine

bash
Copy code
sudo systemctl status certbot.timer
Manually Test Renewal (optional): You can manually test the renewal process with:

bash
Copy code
sudo certbot renew --dry-run
Benefits
Data Protection: Encrypts data in transit, ensuring secure communication.
Compliance: Aligns with CSA’s requirement for protecting data in transit.
Enabling Logging and Monitoring
Logging and monitoring provide visibility into system activities and help detect unauthorized access, as recommended by the CSA Security Guidance v5.

Steps to Enable Logging and Monitoring
Enable System Logs:

Authentication Logs:
bash
Copy code
tail -f /var/log/auth.log
General System Logs:
bash
Copy code
tail -f /var/log/syslog
Install and Use htop for Real-Time Monitoring:

Install htop to monitor system metrics like CPU, memory, and processes:

bash
Copy code
sudo apt install htop
Run htop to view real-time system metrics:

bash
Copy code
htop
Enable UFW Firewall Logging: Enable logging to monitor incoming and outgoing traffic:

bash
Copy code
sudo ufw logging on
Leverage Apache Access Logs: Apache generates access logs by default, located in /var/log/apache2/access.log. You can view recent entries with:

bash
Copy code
tail -f /var/log/apache2/access.log
Benefits
Improved Visibility: Logs provide insight into system activity, enabling auditing and investigation.
CSA Compliance: Meets CSA’s guidelines for monitoring and visibility.
Automated Vulnerability Scanning
Regular vulnerability scanning was implemented to identify and mitigate security weaknesses on the VM, following CSA’s best practices for vulnerability management.

Steps to Implement Automated Vulnerability Scanning with Lynis
Lynis is a simple yet effective tool for auditing Linux security configurations and identifying vulnerabilities.

Install Lynis:

bash
Copy code
sudo apt update
sudo apt install lynis -y
Run an Initial System Audit: Run a scan to identify security gaps and vulnerabilities:

bash
Copy code
sudo lynis audit system
The output provides a list of findings and recommended actions.
Automate Weekly Scans: Schedule a cron job to perform regular scans, such as every Sunday at 2 a.m.

bash
Copy code
sudo crontab -e
Add the following line to schedule the weekly scan:

plaintext
Copy code
0 2 * * 0 /usr/sbin/lynis audit system --quiet
Review and Act on Scan Results: After each scan, check for high-priority vulnerabilities and address them as needed.

Benefits
Continuous Improvement: Regular scans help proactively identify and fix vulnerabilities.
CSA Compliance: Aligns with CSA guidelines for continuous monitoring and vulnerability management.
Summary
The security measures implemented on this VM improve its overall security posture, in alignment with CSA Security Guidance v5. Key actions taken:

HTTPS Certificate: Installed to secure data in transit.
Logging and Monitoring: Enabled to track and analyze system activity.
Automated Vulnerability Scanning: Set up to identify and mitigate security risks on an ongoing basis.
Together, these steps enhance the security of the VM, contributing to robust data protection and system monitoring as recommended by CSA.