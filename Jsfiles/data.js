const messageBox = document.getElementById("fmessage");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const submitBtn = document.getElementById("submitBtn");

if (contactForm && messageBox && formStatus && submitBtn) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (messageBox.value.length < 5) {
      formStatus.innerHTML = "Message must be at least 5 characters long.";
      formStatus.style.display = "block";
      formStatus.style.color = "#721c24";
      return;
    }

    submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;
    formStatus.style.display = "none";

    const formData = new FormData(this);
    const senderEmail = formData.get("email");
    if (senderEmail) {
      formData.set("replyto", senderEmail);
    }

    fetch(this.action, {
      method: "POST",
      headers: {
        "Accept": "application/json"
      },
      body: formData,
    })
      .then(async (response) => {
        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error("Submission failed");
        }

        contactForm.style.display = "none";
        formStatus.innerHTML = "Thank you! Your message has been sent successfully. Reloading...";
        formStatus.style.display = "block";
        formStatus.style.backgroundColor = "#d4edda";
        formStatus.style.color = "#155724";

        contactForm.reset();

        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch(() => {
        formStatus.innerHTML = "Oops! Something went wrong. Please try again.";
        formStatus.style.display = "block";
        formStatus.style.backgroundColor = "#f8d7da";
        formStatus.style.color = "#721c24";
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
      });
  });
}
