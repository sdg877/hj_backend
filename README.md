Description 
This project was my first freelance commission. I built a website for an artist to showcase their work, connect with customers, and generate sales and commissions. The client needed a way to manage the website content themselves, so I included a secure admin area.

Deployed site:
https://htreharnejones.co.uk/

Brief 
The client's requirements included:
Galleries for each art medium
A contact form
An "About Me" section
A news section
A commissions section
A backend for adding, editing, and deleting artwork and news updates
The client provided specific design preferences for colours, the banner image, and how their name was displayed, requesting a "clean" look. I handled the rest of the design and development.

Timeline
The project was completed in three weeks. The initial two-week estimate was based on the development timeline. Content delivery, a collaborative part of the project, extended the overall duration.

Technologies Used:
MERN Stack (MongoDB, Express.js, React, Node.js)
React Carousel
EmailJS
Vite
Babel

Code Process
I began by setting up the project's frontend and backend, including user authentication and database integration. I implemented backend functionality for news updates, image uploads, and email integration using AWS S3 for image storage.
The frontend development involved building components for galleries, contact forms, and an admin dashboard. I integrated features like image tagging, categorisation, and secure admin access. I also focused on responsive design, ensuring the site works well on both desktop and mobile devices.
I encountered challenges with S3 bucket configuration, mobile file uploads, and special character handling, all of which I resolved through code updates and configuration changes.
Throughout development, I maintained regular communication with the client, adapting to their feedback and making sure the final product met their needs. The project concluded with thorough testing and deployment, resulting in a user-friendly and easily maintainable website.

Challenges
S3 Bucket Setup: Initially encountered issues with uploading images due to misconfigured settings. Resolved by updating the bucket settings to allow get, put, and delete actions from the frontend.
![image](https://github.com/user-attachments/assets/e5d5479c-436e-45e1-b02d-eede137c6d27)


Mobile File Uploads: Faced file size limitations when uploading from mobile devices. Fixed by updating the nginx settings (client_max_body_size 50M).
Special Character Handling: Encountered an error when special characters were used in image descriptions. Implemented encryption in the backend and decryption in the frontend to resolve this.

Backend:
![image](https://github.com/user-attachments/assets/79d4cf67-35af-480e-bc68-2e77bf9dc616)


Frontend:
![image](https://github.com/user-attachments/assets/1ba9213b-197b-4db9-9d7b-2e29a6e3a203)


Wins
Successfully implemented a responsive design that looks great on all devices, enhancing user experience.
Learned and applied new tools/technologies (React Carousel) to improve site performance and maintainability.
Overcame deployment challenges to get the website live and accessible to the public.
Received positive feedback from the client regarding the site's aesthetic and functionality, particularly around specific features.
Built a robust and maintainable codebase that will make future updates easier for the client.


Overcame deployment challenges to get the website live and accessible to the public.
Received positive feedback from the client regarding the site's aesthetic and functionality, particularly around specific features.
Built a robust and maintainable codebase that will make future updates easier for the client.


Key Learnings

Real-World Client Experience: As my first client project, I learned how to manage client expectations, communicate effectively, and adapt to changing requirements.
Client Communication: Learned how to bridge the gap between technical concepts and non-technical client expectations, improving my ability to explain web development principles clearly.
Project Management: Developed better time management and prioritization skills, especially when balancing unexpected client requests with the original project timeline.
Deployment Experience: Strengthened my knowledge of deploying a full-stack application, including troubleshooting issues that arose during the launch process.
Flexibility and Problem Solving: Enhanced my adaptability in handling vague feedback and finding practical solutions to ensure the project's success.


Bugs:
No known bugs. The website has been thoroughly tested, and all features are functioning as intended. Any issues identified during development were resolved before the final deployment. The client has not reported any problems since the website went live.


Future Improvements:
No immediate improvements are required, as the website was built with a user-friendly content management approach. The client can independently manage and update the site's content, ensuring it remains up-to-date without the need for further development work.

Screenshots

Desktop
Home
![Home 06 11 55](https://github.com/user-attachments/assets/02bdbaed-9d1e-4354-9606-389c8a529461)

Gallery Pages
![Sculpture Gallery](https://github.com/user-attachments/assets/1c14d204-1cb7-44bf-8a3f-a8212696cca3)

![Card Gallery](https://github.com/user-attachments/assets/237587aa-d8ef-489e-9731-df2b2c0e79c2)

News
![News Page](https://github.com/user-attachments/assets/ca968066-f9ae-477c-be7a-015847870a58)

About
![About 1](https://github.com/user-attachments/assets/2e3875dc-f811-4812-bf95-8491923ae4d5)

![About 2](https://github.com/user-attachments/assets/ce33c3a2-022a-4d6a-85c3-35eb030ea3b0)


Contact
![Contact](https://github.com/user-attachments/assets/eba2f4f8-249c-46c5-b316-50c16bad2d25)


Clients Admin Area
Login Page
![Screenshot 2025-02-24 at 06 08 15 (2)](https://github.com/user-attachments/assets/473a048a-d0c1-4046-baf9-18c37a1874cb)

Main Dashboard
![Screenshot 2025-02-24 at 06 10 00 (2)](https://github.com/user-attachments/assets/e6a3cbe5-93b7-4ba6-9477-d4739619745f)

Image Dashboard
![Screenshot 2025-02-24 at 06 10 34 (2)](https://github.com/user-attachments/assets/70d5fa34-7834-4031-aa12-da1e3fce5ef6)

News Dashboard
![Screenshot 2025-02-24 at 06 11 10 (2)](https://github.com/user-attachments/assets/468bec56-5e7b-46e0-b79a-a907262be7e1)


Mobile friendly
Home
![Screenshot 2025-02-24 at 06 12 53](https://github.com/user-attachments/assets/4d12ac17-e980-4df4-8d28-3cee1e60194f)

Gallery
![Screenshot 2025-02-24 at 06 13 06](https://github.com/user-attachments/assets/a458d420-ba56-4d36-ae6e-83c22698d4b1)
![Screenshot 2025-02-24 at 06 13 16](https://github.com/user-attachments/assets/6cdfc0df-3260-4056-9be5-68c142dd04e0)

About
![Screenshot 2025-02-24 at 06 13 44](https://github.com/user-attachments/assets/7b801f91-bfb1-42b2-9dcd-c12b70786e95)
![Screenshot 2025-02-24 at 06 14 01](https://github.com/user-attachments/assets/25980483-26b6-430e-a718-a6fc4704ba07)

Contact
![Screenshot 2025-02-24 at 06 14 31](https://github.com/user-attachments/assets/08f1395b-0712-497f-b9b5-a4db5c7ad539)
![Screenshot 2025-02-24 at 06 14 39](https://github.com/user-attachments/assets/7ae6af74-c3a5-4bb8-8f17-081164600d2a)

Admin Area
![Screenshot 2025-02-24 at 06 57 02](https://github.com/user-attachments/assets/88613361-e26d-46ec-bfe1-9b38546db3a8)
![Screenshot 2025-02-24 at 06 57 13](https://github.com/user-attachments/assets/10fb0d4c-4b7c-40d6-bd17-82c3b387467d)
![Screenshot 2025-02-24 at 06 57 23](https://github.com/user-attachments/assets/c9056a8d-9e75-45de-86b5-39d31d9da7c2)
![Screenshot 2025-02-24 at 06 57 38](https://github.com/user-attachments/assets/4af3c5f7-6652-465c-86cf-3a963c57ca05)
![Screenshot 2025-02-24 at 06 57 47](https://github.com/user-attachments/assets/97cd789b-f14e-42be-a447-d4b19342221f)



