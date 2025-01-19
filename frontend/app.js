document.getElementById('uploadButton').addEventListener('click', async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const uploadType = document.getElementById('uploadType').value;
    const formData = new FormData();

    if (uploadType === 'marks') {
        await handleMarksUpload(formData);
    } else if (uploadType === 'attendance') {
        await handleAttendanceUpload(formData);
    } else if (uploadType === 'studentDetails') {
        await handleStudentDetailsUpload(formData);
    }
});

async function handleMarksUpload(formData) {
    const marksFileInput = document.getElementById('marksFile');
    if (!marksFileInput.files[0]) {
        alert('Please select a marks file');
        return;
    }

    const marksFile = marksFileInput.files[0];
    formData.append('marksFile', marksFile);

    // Get the selected exam type
    const examType = document.getElementById('examType').value;
    formData.append('examType', examType);

    await uploadFile('marks/uploadMarks', formData, 'Marks file uploaded successfully!');
}

async function handleAttendanceUpload(formData) {
    const attendanceFileInput = document.getElementById('attendanceFile');
    if (!attendanceFileInput.files[0]) {
        alert('Please select an attendance file');
        return;
    }

    const attendanceFile = attendanceFileInput.files[0];
    formData.append('attendanceFile', attendanceFile);

    await uploadFile('attendance/uploadAttendance', formData, 'Attendance file uploaded successfully!');
}

async function handleStudentDetailsUpload(formData) {
    const studentDetailsFileInput = document.getElementById('studentDetailsFile');
    if (!studentDetailsFileInput.files[0]) {
        alert('Please select a student details file');
        return;
    }

    const studentDetailsFile = studentDetailsFileInput.files[0];
    formData.append('studentDetailsFile', studentDetailsFile);

    await uploadFile('studentDetails/uploadStudentDetails', formData, 'Student details file uploaded successfully!');
}

async function uploadFile(endpoint, formData, successMessage) {
    try {
        const response = await fetch('http://127.0.0.1:3000/api/' + endpoint, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorText = await response.text();
            alert('Upload failed: ' + errorText);
            return;
        }

        const data = await response.json();
        if (data.message && data.message.toLowerCase().includes('uploaded')) {
            alert(successMessage);
        } else {
            alert('Unexpected response message: ' + data.message);
        }
    } catch (error) {
        console.error('Upload Error:', error);
        //alert('Error: ' + error.message);
    }
}
