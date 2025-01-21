const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

function sanitizeInput(input) {
    const div = document.createElement("div");
    div.textContent = input;
    return div.innerHTML;
  }

// Get and render tasks from Firestore
async function renderTasks() {
    var tasks = await getTasksFromFirestore();
    taskList.innerHTML = "";
  
    tasks.forEach((task, index) => {
      if(!task.data().completed){
        const taskItem = document.createElement("li");
        taskItem.id = task.id;
        taskItem.textContent = task.data().text;
        taskList.appendChild(taskItem);
      }
    });
  }

async function getTasksFromFirestore() {
    var data = await getDocs(collection(db, "todos"));
    let userData = [];
    data.forEach((doc) => {
      userData.push(doc);
  });
  return userData;
}

// Add Task
addTaskBtn.addEventListener('click', async () => {
    const task = taskInput.value.trim();
    if (task) {
        const taskInput = document.getElementById("taskInput");
        const taskText = sanitizeInput(taskInput.value.trim());

        if (taskText) {
            await addTaskToFirestore(taskText);
            renderTasks();
            taskInput.value = "";
        }
        renderTasks();
    }
});

async function addTaskToFirestore(taskText) {
    await addDoc(collection(db, "todos"), {
      text: taskText, 
      completed: false
    });  
  }

// Remove Task on Click
taskList.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        e.target.remove();
    }
});

const sw = new URL('service-worker.js', import.meta.url)
if ('serviceWorker' in navigator) {
    const s = navigator.serviceWorker;
    s.register(sw.href, {
        scope: '/INFO-5146-PWA/'
    })
        .then(_ => console.log('Service Worker Registered for scope:', sw.href, 'with', import.meta.url))
        .catch(err => console.error('Service Worker Error:', err));
}


// Import the functions you need from the SDKs you need
const initSrc = "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js"
const initApp = async (src) => {
    const module = await import(initSrc)
}



//import { doc, getDocs, addDoc, updateDoc, getFirestore, collection } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCRPKcj7KdzjHALuVWDwLB2-znUtPmSpVs",
    authDomain: "pwa-7d72b.firebaseapp.com",
    projectId: "pwa-7d72b",
    storageBucket: "pwa-7d72b.firebasestorage.app",
    messagingSenderId: "465059750153",
    appId: "1:465059750153:web:42c9e1528caa2528e533d8"
};

// Initialize Firebase
const app = initApp(firebaseConfig);