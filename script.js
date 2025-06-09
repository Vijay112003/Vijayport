// ==================== Theme & Mode Logic ====================

// Image arrays for light and dark mode
const sliderImagesLight = [
    "assets/imgs/2.jpeg",
    "assets/imgs/1.jpeg",
    "assets/imgs/3.jpeg"
];
const sliderImagesDark = [
    "assets/imgs/4.jpeg",
    "assets/imgs/5.jpeg",
    "assets/imgs/6.jpeg"
];

function updateSliderImages(isDark) {
    const slider = document.querySelector('.image-slider');
    if (!slider) return;
    const images = slider.querySelectorAll('.slides img');
    const sources = isDark ? sliderImagesDark : sliderImagesLight;
    images.forEach((img, i) => {
        if (sources[i]) img.src = sources[i];
    });
}

function updateIcon() {
    const isDark = document.body.classList.contains('dark-mode');
    document.getElementById('sun-rays-light').style.display = isDark ? 'none' : '';
    document.getElementById('sun-rays-dark').style.display = isDark ? '' : 'none';
}

function toggleMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    updateIcon();
    updateSliderImages(isDark);
}

document.addEventListener('DOMContentLoaded', function() {
    updateIcon();
    updateSliderImages(document.body.classList.contains('dark-mode'));
});

// ==================== Image Slider ====================

(function() {
    const slider = document.querySelector('.image-slider');
    if (!slider) return;
    const slides = slider.querySelector('.slides');
    const images = slides.querySelectorAll('img');
    const dots = slider.querySelectorAll('.dot');
    let current = 0;
    let interval;

    function showSlide(idx) {
        current = (idx + images.length) % images.length;
        slides.style.transform = `translateX(-${current * 100}%)`;
        dots.forEach((dot, i) => {
            dot.style.opacity = i === current ? '1' : '0.7';
            dot.style.background = i === current ? '#ff9800' : '#fff';
        });
    }

    function nextSlide() { showSlide(current + 1); }
    function prevSlide() { showSlide(current - 1); }

    slider.querySelector('.next').onclick = nextSlide;
    slider.querySelector('.prev').onclick = prevSlide;
    dots.forEach((dot, i) => dot.onclick = () => showSlide(i));

    function startAuto() {
        interval = setInterval(nextSlide, 3500);
    }
    function stopAuto() {
        clearInterval(interval);
    }
    slider.addEventListener('mouseenter', stopAuto);
    slider.addEventListener('mouseleave', startAuto);

    showSlide(0);
    startAuto();
})();

// ==================== Typewriter Effect (About Section) ====================
const zohoabt=`I am excited to begin a new chapter in my career as a <span class="zoho-green"><strong>Software Developer at <img src="./assets/imgs/zoho.png" alt="Zoho Corporation" style="height: 30px; vertical-align: middle; opacity: 0.8;"></strong></span>. This opportunity is a result of consistent effort, passion, and a commitment to excellence.\n\n`;
const aboutTexts = [
    `With a strong foundation in computer science, I specialize in writing clean, scalable code and delivering impactful solutions. I thrive in dynamic environments and enjoy collaborating with innovative teams to solve challenging problems.\n\n`,
    `I was honored with the title of <strong>Mr. CSE - 2024</strong> at my college, a recognition that reflects my technical dedication, leadership, and continual learning mindset.`
];

function typeWriterEffect(element, texts, speed = 40, cb) {
    let i = 0, j = 0, html = '';
    function type() {
        if (i < texts.length) {
            let text = texts[i];
            if (j < text.length) {
                // Handle HTML tags
                if (text[j] === '<') {
                    let close = text.indexOf('>', j);
                    html += text.substring(j, close + 1);
                    j = close + 1;
                } else {
                    html += text[j];
                    j++;
                }
                element.innerHTML = html;
                setTimeout(type, speed);
            } else {
                i++;
                j = 0;
                setTimeout(type, 1200);
            }
        } else if (cb) {
            cb();
        }
    }
    type();
}

document.addEventListener('DOMContentLoaded', function() {
    const aboutEl = document.getElementById('about-typewriter');
    const btns = document.getElementById('about-buttons');
    const btnList = btns.querySelectorAll('button');
    aboutEl.style.borderRight = 'none';
    typeWriterEffect(aboutEl, aboutTexts, 18, () => {
        btns.style.opacity = 1;
        aboutEl.style.borderRight = 'none';
        // Show buttons one by one
        btnList.forEach((btn, idx) => {
            btn.style.opacity = 0;
            btn.style.transform = 'scale(0.7)';
            btn.style.transition = 'opacity 0.4s, transform 0.4s';
        });
        function showBtn(i) {
            if (i >= btnList.length) return;
            btnList[i].style.opacity = 1;
            btnList[i].style.transform = 'scale(1)';
            setTimeout(() => showBtn(i + 1), 200);
        }
        showBtn(0);
    });
});

// ==================== Navigation & Smooth Scroll ====================

document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#') && href.length > 1) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ==================== Scroll Animation ====================

function handleScrollAnimate() {
    const elements = document.querySelectorAll('.scroll-animate');
    const triggerBottom = window.innerHeight * 0.92;
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < triggerBottom) {
            el.classList.add('visible');
        }
    });
}
window.addEventListener('scroll', handleScrollAnimate);
window.addEventListener('resize', handleScrollAnimate);
document.addEventListener('DOMContentLoaded', handleScrollAnimate);

// ==================== Modal Logic (Achievements & Resume) ====================

const modal = document.getElementById('achievementModal');
const modalTitle = document.getElementById('modal-title');
const modalImages = document.querySelector('.modal-images');

const modalData = {
    1: {
        title: 'Winning Moments',
        imagetitle: ["Dr.Kalam Young Achiever Award", "National Engineers Day Winner", "Shouting in Silence", "Media Review"],
        images: ['win1.jpg', 'win2.jpg', 'win3.jpg', 'win4.jpg']
    },
    2: {
        title: 'Participation Highlights',
        imagetitle: ["Pitch Pannel", "Paper Presentation", "Quiz(School)", "VollyBall(School)", "Essay Writing", "Marathon"],
        images: ['part1.jpg', 'part2.jpg', 'part3.jpg', 'part4.jpg', 'part5.jpg', 'part6.jpg']
    },
    3: {
        title: 'Other Achievements',
        imagetitle: ["School Culturals",  "School Academics", "School Literature Club Competition", "Workshop", "Seminar", "Workshop", "Seminar", "JRC-School", "Kinnas Record"],
        images: [
            'others3.jpg','others5.jpg', 'others6.jpg', 'others7.jpg', 'others8.jpg',
            'others9.jpg', 'others10.jpg', 'others11.jpg', 'others12.jpg'
        ]
    }
};

document.querySelectorAll('[data-image-id]').forEach(button => {
    button.addEventListener('click', () => {
        const id = button.getAttribute('data-image-id');
        const data = modalData[id];

        modalTitle.textContent = data.title;
        modalImages.innerHTML = '';
        modalImages.innerHTML= '<div class="portfolio-cards scroll-animate">';
        modalImages.innerHTML = data.images.map((img, idx) =>
            `<div class="card scroll-animate" style="pointer-events: none; cursor: default;">
                <h3>${data.imagetitle[idx]}</h3>
                <img src="assets/imgs/achievements/${img}" alt="${data.imagetitle[idx]}" style="align-items: center; width: 100%; height: 100%;">
            </div>`
        ).join('');
        modalImages.innerHTML += '</div>';

        modal.classList.remove('hidden');
    });
});

function closeModal() {
    modal.classList.add('fade-out');
    setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('fade-out');
    }, 300);
}
modal.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeModal();
    }
});

// Resume modal logic
document.addEventListener('DOMContentLoaded', function() {
    const resumeBtn = document.getElementById('resume-btn');
    const modal = document.getElementById('achievementModal');
    const modalTitle = document.getElementById('modal-title');
    const modalImages = document.querySelector('.modal-images');
    resumeBtn.addEventListener('click', function() {
        modalTitle.textContent = 'Resume';
        modalImages.innerHTML = `
            <div style="width:100%;height:100vh;display:flex;justify-content:center;align-items:center;">
                <iframe src="./assets/documents/Resume.pdf" style="width:90%;height:100%;border:none;" title="Resume PDF"></iframe>
            </div>
        `;
        modal.classList.remove('hidden');
    });
});

// ==================== Scroll To Top Button ====================

const scrollBtn = document.getElementById('scrollToTopBtn');
window.addEventListener('scroll', () => {
    scrollBtn.style.display = window.scrollY > 1000 ? 'block' : 'none';
});
scrollBtn.addEventListener('click', () => {
    document.getElementById('body').scrollIntoView({ behavior: 'smooth' });
});

window.addEventListener('scroll', function() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    document.getElementById('progress-bar').style.width = scrolled + '%';
});