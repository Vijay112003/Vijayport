(function () {

    emailjs.init("RxS2GJ3Nzl_koeo6X");

    const modal = document.getElementById("achievementModal");
    const modalTitle = document.getElementById("modal-title");

    const existingEmail = sessionStorage.getItem("visitor_email");
    const existingUrl = sessionStorage.getItem("visit_for_the_site");

    // ✅ If already stored → DO NOTHING
    if (existingEmail && existingUrl === window.location.href) {
        console.log("Visitor already captured. Skipping modal + email.");
        return;
    }

    // Create form dynamically
    const formContainer = document.createElement("div");

    formContainer.innerHTML = `
        <div style="margin-top:20px;">
            <p style="margin-bottom:10px;">
                Enter your email to continue
            </p>

            <input
                type="email"
                id="visitorEmail"
                placeholder="Enter your email"
                style="
                    width:100%;
                    padding:12px;
                    border:1px solid #ccc;
                    border-radius:6px;
                    font-size:16px;
                    box-sizing:border-box;
                "
            />
            <!-- Alert text -->
            <div id="emailAlert" style="color:green; display:none;">
            </div>

            <button
                id="saveVisitorBtn"
                style="
                    margin-top:15px;
                    width:100%;
                    padding:12px;
                    border:none;
                    background:#111827;
                    color:white;
                    border-radius:6px;
                    cursor:pointer;
                    font-size:16px;
                "
            >
                Save & Continue
            </button>
        </div>
    `;

    modal.querySelector(".modal-content").appendChild(formContainer);

    // Open modal only if not already visited
    window.addEventListener("load", () => {
        modal.classList.remove("hidden");
        modalTitle.innerText = "Welcome";
    });

    document.addEventListener("click", async function (e) {

        if (e.target.id === "saveVisitorBtn") {

            const email = document.getElementById("visitorEmail").value.trim();

            if (!email || !isEmailID(email)) {
                document.getElementById("emailAlert").style.display = "block";
                document.getElementById("emailAlert").innerText = "Please enter a valid email address.";
                return;
            }

            let ipData = {};

            try {
                const response = await fetch("https://ipapi.co/json/");
                ipData = await response.json();
            } catch (err) {
                console.log(err);
            }

            const visitorData = {
                visitor_email: email,
                browser: navigator.userAgent,
                platform: navigator.platform,
                language: navigator.language,
                screen: `${screen.width}x${screen.height}`,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                url: window.location.href,
                time: new Date().toString(),
                ip: ipData.ip || "Unknown",
                region: ipData.region || "Unknown",
                city: ipData.city || "Unknown",
                country: ipData.country_name || "Unknown",
                isp: ipData.org || "Unknown",
                referrer: document.referrer || "Direct",
            };

            emailjs.send(
                "service_xjdk0in",
                "template_8dixbyr",
                visitorData
            ).then(() => {

                // ✅ store session only after success
                sessionStorage.setItem("visitor_email", email);
                sessionStorage.setItem("visit_for_the_site", window.location.href);

                modalTitle.innerText = "Thank you!";
                modal.querySelector(".modal-content").innerHTML = `
                    <h2>Thank you for sharing your email!</h2>
                    <p style="margin-top:10px;">You can now explore the site.</p>
                `;

                setTimeout(() => {
                    modal.classList.add("hidden");
                }, 2000);

            }).catch((err) => {
                console.log(err);
                console.log("Failed to send email. Not storing visitor data.");
            });
        }

    });

})();
