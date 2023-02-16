//First three variables are for usernameField.addEventListener
const usernameField = document.querySelector("#usernameField");
const feedBackArea = document.querySelector(".invalid_feedback");
const usernameSuccessOutput = document.querySelector(".usernameSuccessOutput");

const emailField = document.querySelector("#emailField");
const emailFeedBackArea = document.querySelector(".emailFeedBackArea");

const passwordField = document.querySelector("#passwordField");
const showPasswordToggle = document.querySelector(".showPasswordToggle");
const submitBtn = document.querySelector(".submit-btn");
const handleToggleInput = (e) => {
  if (showPasswordToggle.textContent === "SHOW") {
    showPasswordToggle.textContent = "HIDE";
    passwordField.setAttribute("type", "text");
  } else {
    showPasswordToggle.textContent = "SHOW";
    passwordField.setAttribute("type", "password");
  }
};

showPasswordToggle.addEventListener("click", handleToggleInput);


//Following is to validate email using librarfy validate_email  and is not taken using call to authintication/views/EmailValidationView
//It start by sending email entered on every keyup, server side run validation and return either email_error or email_valid

emailField.addEventListener("keyup", (e) => {
  const emailVal = e.target.value;

  emailField.classList.remove("is-invalid");
  emailFeedBackArea.style.display = "none";

  if (emailVal.length > 0) {
    fetch("/authentication/validate-email", {
      body: JSON.stringify({ email: emailVal }),
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        if (data.email_error) {
          submitBtn.disabled = true;
          emailField.classList.add("is-invalid");
          emailFeedBackArea.style.display = "block";
          emailFeedBackArea.innerHTML = `<p>${data.email_error}</p>`;
        } else {
          submitBtn.removeAttribute("disabled");
        }
      });
  }
});





//Following is to validate if username is only alphanum and is not taken using call to authintication/views/UsernameValidationView
//It start by sending username entered on every keyup, server side run validation and return either username_error or username_valid
usernameField.addEventListener("keyup", (e) => {
  const usernameVal = e.target.value;
  //console.log(usernameVal);
//e is the event, which in this case is keyup,
//target is the element that triggered the event, which in this case is the input, and value is the value of the input element
  usernameSuccessOutput.style.display = "block";

  usernameSuccessOutput.textContent = `Checking  ${usernameVal}`;

  usernameField.classList.remove("is-invalid");
  feedBackArea.style.display = "none";

  if (usernameVal.length > 0) {
  //THis is post request send to server
    fetch("/authentication/validate-username", {
      body: JSON.stringify({ username: usernameVal }),
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
  //Data retruned by server/validate_username
//        console.log('data':data);
        usernameSuccessOutput.style.display = "none";
        if (data.username_error) {
          usernameField.classList.add("is-invalid");
          feedBackArea.style.display = "block";
          feedBackArea.innerHTML = `<p>${data.username_error}</p>`;
          submitBtn.disabled = true;
        } else {
          submitBtn.removeAttribute("disabled");
        }
      });
  }
});