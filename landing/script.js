(function () {
  const header = document.querySelector(".site-header");
  const form = document.querySelector("#signupForm");
  const formNote = document.querySelector("#formNote");

  function updateHeader() {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  }

  function getUtmParams() {
    const searchParams = new URLSearchParams(window.location.search);
    const utm = {};
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach((key) => {
      const value = searchParams.get(key);
      if (value) {
        utm[key] = value;
      }
    });
    return utm;
  }

  function readStoredSignups() {
    try {
      return JSON.parse(window.localStorage.getItem("cookCue.validationSignups") || "[]");
    } catch (error) {
      return [];
    }
  }

  function saveSignupLocally(signup) {
    const signups = readStoredSignups();
    signups.push(signup);
    window.localStorage.setItem("cookCue.validationSignups", JSON.stringify(signups));
  }

  async function sendSignup(signup) {
    const endpoint = form.dataset.endpoint || window.COOKCUE_SIGNUP_ENDPOINT || "";
    if (!endpoint) {
      saveSignupLocally(signup);
      return "local";
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signup),
    });

    if (!response.ok) {
      throw new Error(`Signup request failed with status ${response.status}`);
    }

    return "remote";
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);
    const signup = {
      email: String(formData.get("email") || "").trim(),
      use_case: String(formData.get("use_case") || ""),
      price: String(formData.get("price") || ""),
      country: String(formData.get("country") || "").trim(),
      utm: getUtmParams(),
      created_at: new Date().toISOString(),
    };

    form.querySelector("button[type='submit']").disabled = true;
    formNote.textContent = "Saving your spot...";
    formNote.classList.remove("success");

    try {
      const mode = await sendSignup(signup);
      form.reset();
      formNote.textContent =
        mode === "remote"
          ? "You are on the early list. We will share prototype updates soon."
          : "You are on the early list. Prototype mode saved this signup in this browser.";
      formNote.classList.add("success");
    } catch (error) {
      formNote.textContent = "Something went wrong. Please try again in a moment.";
    } finally {
      form.querySelector("button[type='submit']").disabled = false;
    }
  }

  window.addEventListener("scroll", updateHeader, { passive: true });
  form.addEventListener("submit", handleSubmit);
  updateHeader();
})();
