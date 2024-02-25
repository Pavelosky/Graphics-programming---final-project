# BSc Computer Science
## CM2030 – Graphics Programming
### Final Coursework: An image processing application

For this assignment, you will develop an image processing application. You will utilize the webcam to perform several image processing manipulations such as image thresholding and color space conversions. You will also use face detection to perform some privacy-enhancing filters such as face blur and pixelate. You will earn individual points for each requirement and points for the overall performance, i.e., is the logic of the application simple or complex and confusing, are there any bugs during execution, etc. You will need to justify your answer for a few of these tasks – use commentary to discuss that. You can only use the libs shown in this course, and no external code will be allowed. All the code should be your own work. The following grid of images should be expected to appear at your browser when executing the app.

- Webcam image
- Grayscale and brightness +20%
- Red channel
- Green channel
- Blue channel
- Threshold image
- Threshold image
- Threshold image
- Webcam image (repeat)
- Color space 1
- Color space 2
- Threshold image from color space 1
- Threshold image from color space 2
- Face detection and replaced face images

### Task/Steps:
1. Load an image using the webcam: you can either take a snapshot, save it to disk and load it back, or you can use this snapshot as a buffer image and use it without saving it to disk. Use key/mouse interaction to take the snapshot or save the image.
2. Scale that image to 160 x 120 pixels (i.e minimum resolution).
3. Display the webcam image in the grid at the position titled "Webcam image". Then using this webcam image complete all tasks 4 – 11.
4. Convert image to grayscale and increase the brightness by 20%. This should happen within the same nested for loop that you use to convert the image to grayscale. Display the image at the appropriate position as seen in the grid.
5. Increasing the brightness can cause the pixel intensity to get beyond the 255 levels. Write code to prevent this from happening.
6. Using the original webcam image: split into three color channels (R, G, B) and show each channel. Again, use the appropriate positions as seen in the grid.
7. Perform image thresholding with a slider for each channel separately. Similarly, display the results using the appropriate positions as seen in the grid.
8. What can you say about the result of thresholding for each channel – is it different and why? Explain this in the commentary section.
9. Using the original webcam image again and assuming your camera’s color model is using an RGB color model, perform color space conversion. Select two algorithms from the resource attached in the submission page. See examples of how the converted images should look like at the bottom of this file. Display the images at the correct position in the grid again.
10. Using the color-converted images perform image thresholding using either a static threshold or a slider to control the threshold. If using a static threshold value, make sure the thresholded image shows an expected result (see 1st image at the bottom of this page). There’s no need to split into channels here. Display the images at the correct position in the grid again.
11. What can you say about the thresholding results above when compared to step 7 i.e. is the thresholded image noisier etc? Can you use a different color space to improve results? Discuss the above in the commentary.
12. Perform face detection as described in the lecture videos. Here you have two options: you could use the approach shown in the course (see Week 19) or the face api from here: [face-api](https://learn.ml5js.org/#/reference/face-api).
13. Display the detected face at the correct position in the grid - then by using keystrokes of your choice - replace the detected face image with: 
    - A grayscale image 
    - A blurred image – adjust blurring so your face is not recognizable 
    - A color-converted image – reuse code from task 9 
    - A pixelate image. To perform pixelation use the following approach 
        i. Run step a – so that your image is grayscale 
        ii. Split the detected face image into 5x5 pixel blocks 
        iii. Calculate the average pixel intensity of each block using image.get(x, y); (to access each pixel’s intensity) 
        iv. Paint the entire block using the average pixel intensity. Utilize this command: outimage.set(x, y, avePixInt); 
        v. Loop through all blocks repeating steps iii and iv. Display the images at the correct position in the grid again.

### Coding Style:
1. Code presentation: use appropriate syntax, comments, consistent indentation, and leftover code blocks
2. Code competency: use of object orientation, code reusability, use of functions, variables global vs local

### Extension:
Since this is a creative module, we would like to give more marks for implementing further ideas. Also, you should write some words about it in the commentary. Please note that we will award marks for the uniqueness of your extension and how technically challenging it appears to have been. The extension is worth 20% of your mark.

### Commentary:
- Discuss your findings e.g. image thresholding using each color channel
- What problems have you faced and were you able to solve them?
- Were you on target to successfully complete your project? If not, how would you address the issue/s and do things differently?
- Also, discuss your extension and why it is a unique idea

### Submission Requirements:
1. Compress all your code in .ZIP format and upload it in the first prompt
2. Upload the video demo in .mp4 format in the second prompt
3. Use alternative video submission link to upload the video demo to YouTube or similar, then submit the URL only in the third prompt. Make sure your video remains unlisted.
4. Merge all your .js code in a single file, then upload it in the last prompt. Use the JavaScript Bundler Tool (see previous learning item) to merge all your .js files into a single .txt file. Exclude any libraries you used such as p5.js, matter.js etc. This is a submission requirement as we need this to run your code.

### Rubric:
- Program runs and without errors? (check console)
- Program is usable e.g. easy to use without confusing behavior
- Image loaded from the webcam
- Grayscale conversion
- Brightness increase to 20%
- Added brightness not to exceed 255 pixel intensity
- Split image into three channels
- Perform image thresholding for each channel with the use of a slider to adjust values
- Color space conversion #1
- Color space conversion #2
- Perform image thresholding for color space #1 [1 point if you use static threshold] or [2 points with a use of a slider to adjust values]
- Perform image thresholding for color space #2 [1 point if you use static threshold] or [2 points with a use of a slider to adjust values]
- Face detection works using a bounding box
- Replace the detected face image with a grayscale converted image
- Replace the detected face image with a blurred image
- Replace the detected face
