        // Import the functions you need from the SDKs
        import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
        import { getFirestore, collection, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
        
        // Your web app's Firebase configuration
        const firebaseConfig = {
            apiKey: "AIzaSyAAkfexfHIf3JVfzi5V7uFwkpyZb7MTtBg",
            authDomain: "exhibtion-71384.firebaseapp.com",
            projectId: "exhibtion-71384",
            storageBucket: "exhibtion-71384.firebaseapp.com",
            messagingSenderId: "82937693422",
            appId: "1:82937693422:web:01462696a13f6c7b5f5fff",
            measurementId: "G-L6NHXN1KDS"
        };
        
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
        
        // Function to show/hide group selection based on class
        window.showGroup = function() {
            var classValue = document.getElementById('class').value;
            var groupContainer = document.getElementById('group-container');
        
            // Show group selection only for class 11 or 12
            if (classValue === '11' || classValue === '12') {
                groupContainer.style.display = 'block';
            } else {
                groupContainer.style.display = 'none';
            }
        };
        
        // Function to write form data to Firestore
        window.writeToFirestore = async function() {
            try {
                // Get form data
                const formData = {
                    school: document.getElementById('school').value,
                    name: document.getElementById('name').value,
                    class: document.getElementById('class').value,
                    group: document.getElementById('class').value === '11' || document.getElementById('class').value === '12' 
                           ? document.getElementById('group').value 
                           : "",
                    email: document.getElementById('email').value,
                    phone: document.getElementById('phone').value,
                    feedback: document.getElementById('feedback').value,
                    timestamp: new Date().toISOString()
                };
        
                // Generate document ID using current timestamp
                const timestamp = new Date().getTime().toString();
        
                // Store form data in Firestore
                await setDoc(doc(db, "datas", timestamp), formData);
                
                alert("Feedback submitted successfully!");
                document.getElementById('feedbackForm').reset();  // Reset the form after submission
                document.getElementById('group-container').style.display = 'none'; // Hide group container
            } catch (error) {
                console.error("Error adding document: ", error);
                alert("There was an error submitting your feedback. Please try again.");
            }
        };