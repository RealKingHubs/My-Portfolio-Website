const messageBox = document.getElementById("fmessage");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const submitBtn = document.getElementById("submitBtn");

contactForm.addEventListener("submit", function(e) {
  e.preventDefault(); 

  // 1. Check message length inside the submit event
  if (messageBox.value.length < 10) {
    formStatus.innerHTML = "Message must be at least 10 characters long.";
    formStatus.style.display = "block";
    formStatus.style.color = "#721c24";
    return; 
  }

  // Change button text while sending
  submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
  submitBtn.disabled = true;

  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries());

  // Using 'this.action' which now points to the /ajax/ URL
  fetch(this.action, {
    method: "POST",
    headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json" 
    },
    body: JSON.stringify(data),
  })
  .then(async (response) => {
    if (response.ok) {
      contactForm.style.display = "none"; 
      formStatus.innerHTML = "✅ Thank You! Your message has been sent successfully! Reloading.........";
      formStatus.style.display = "block";
      formStatus.style.backgroundColor = "#d4edda";
      formStatus.style.color = "#155724";
      
      contactForm.reset();

      setTimeout(() => {
        window.location.reload();
      }, 3000); 
    } else {
      throw new Error("Submission failed");
    }
  })
  .catch(error => {
    formStatus.innerHTML = "Oops! Something went wrong. Please try again.";
    formStatus.style.display = "block";
    formStatus.style.backgroundColor = "#f8d7da";
    formStatus.style.color = "#721c24";
    submitBtn.disabled = false;
    submitBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
  });
});
