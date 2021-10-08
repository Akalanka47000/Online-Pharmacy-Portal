# Online-Pharmacy-Portal

Wireframe :

![IWT wireframe](https://user-images.githubusercontent.com/73662613/136523039-5a94cf18-d476-49e2-8c2e-ebc6a937ed67.jpg)

Steps to get the web app running:
1. Move the entire Online-Pharmacy-Portal folder inside the xampp root directory (htdocs by default)
2. Spin up the apache and MySQL servers from xampp
3. Navigate to the following url from a browser : http://localhost:{port}/Online-Pharmacy-Portal/index.html

To run the web app from a mobile device:
1. Follow the previously mentioned steps except the last
2. Create a new inbound rule in windows firewall and allow all incoming connections through the ports used by apache
3. Navigate to the following url from a browser : http://{localIPAddress}:{port}/Online-Pharmacy-Portal/index.html

To get the mail functionality working, please follow the configuration steps in the following blog:
https://meetanshi.com/blog/send-mail-from-localhost-xampp-using-gmail/

For initial Admin access to the system please use the following credentials:
Email - admin@gmail.com
Password - 123456
