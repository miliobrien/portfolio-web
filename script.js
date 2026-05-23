// Image definitions using the files listed from the directories
const illustrationImages = [
    "18cddd44-44eb-4cfe-a453-0e6d501291cb.webp",
    "2400510a-074e-4a2f-885d-0ba8fa0da4fc.webp",,,,
    "File_003(1).png",
    "IMG_0678.webp",
    "File_014.jpeg",
    "File_016(1).png",
    "File_020.png",
    "IMG_0685.webp",
    "IMG_0990.webp",
    "File_031.png",
    "File_032.png",
    "File_033.png",
    "File_034.png",
    "File_035.png",
    "File_038.jpeg",
    "IMG_0672.WEBP",
    "img_1608.webp",
    "IMG_1674.webp",
    "Untitled_Artwork.png",
    "bfa77173-e73b-45e5-b6f0-367968968f3a.avif",
    "09d3d144-bf39-4528-9abd-29c558af3e1d.avif",
    "imgi_99_59f6b7f0-cc20-40e2-bc3f-a1594f0c876c.png"
];

const conceptImages = [
    "imgi_105_7daf5899-da6d-41b3-bd3c-f3c7fecd93dd.png",
    "imgi_115_7e6412e9-00b9-495b-aeee-51827b37c233.png",
    "imgi_125_734a4a28-e676-4c3c-bfb0-54c18167e642.png",
    "imgi_12_4be061a9-5c8a-4531-98d4-3b716d048ad9.png",
    "imgi_135_ffe0f888-0ecc-47f3-9a90-3fd42f28b91e.jpg",
    "imgi_146_76345d81-0b01-4131-9032-c8e4e667638c.png",
    "imgi_167_b7ce0580-330c-4ea5-80cc-c8309dd49f7f.png",
    "imgi_178_a19c1285-c736-4be9-bcee-9675401a976d.png",
    "imgi_188_b067fcbb-6ac7-486d-ad28-7dcb28e23e55.png",
    "imgi_198_629be9c9-4dfd-4f41-b646-53b4095910aa.png",
    "imgi_208_a41c5a50-5961-4ac0-a27a-94d65e4c5454.png"
];

const characterDesignImages = [
    "imgi_10_ec6e8f59-6185-495c-b728-e1e711a9a132.png",
    "imgi_20_8961f681-20fd-4dfa-8849-44cb18453b80.png",
    "imgi_30_6469e396-f7ff-424d-a324-71017d31f130.png",
    "imgi_41_fd6db499-f590-48e8-ab39-d8c8b093b4d4.png",
    "imgi_4_1b2e1e42-7dd6-46c1-b017-6ed235fa3850.png",
    "imgi_52_7dbd3dac-50f7-4b8b-b35e-94e39f47e10d.png",
    "imgi_63_c76d8b1f-ebcc-44d9-b998-b0e8c9912586.png",
    "imgi_74_3dd550ff-f730-4544-94fc-7906408476cb.png",
    "imgi_85_2b269eef-34ff-44f6-ab40-9458471d26b8.png",
    "imgi_96_8c7b45d5-bbea-4581-8039-e831abcff4b0.png",
    "imgi_97_8c7b45d5-bbea-4581-8039-e831abcff4b0.png"
];

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Populate Galleries
    function populateGallery(containerId, folder, images) {
        const container = document.getElementById(containerId);
        if (!container) return;

        images.forEach(imgName => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            
            const imgPath = `assets/${folder}/${imgName}`;
            
            item.innerHTML = `
                <img src="${imgPath}" alt="${imgName.split('.')[0]}" loading="lazy">
                <div class="gallery-overlay">
                    <span>View Image</span>
                </div>
            `;
            
            item.addEventListener('click', () => openLightbox(imgPath));
            container.appendChild(item);
        });
    }

    populateGallery('illustration-gallery', 'illustration', illustrationImages);
    populateGallery('concept-gallery', 'concept_visdev', conceptImages);
    populateGallery('character-gallery', 'character_design', characterDesignImages);

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (mobileMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            hamburger.querySelector('i').classList.remove('fa-times');
            hamburger.querySelector('i').classList.add('fa-bars');
        });
    });

    // 4. Lightbox Functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');

    function openLightbox(src) {
        lightboxImg.src = src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    closeLightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // 5. Tab Navigation
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    tabLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            
            // Remove active class from all links and tabs
            tabLinks.forEach(l => l.classList.remove('active'));
            tabContents.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked link and corresponding tab
            document.querySelectorAll(`.tab-link[data-target="${targetId}"]`).forEach(l => l.classList.add('active'));
            const targetTab = document.getElementById(targetId);
            if (targetTab) {
                targetTab.classList.add('active');
            }

            // Scroll to top
            window.scrollTo(0, 0);
        });
    });

    // 6. Scroll Animation Sequence
    const canvas = document.getElementById("hero-sequence");
    if (canvas) {
        const context = canvas.getContext("2d");
        const scrollContainer = document.getElementById("hero-scroll-container");

        const frameCount = 88;
        const currentFrame = index => (
            `assets/sequence/Se va de pantalla${index.toString().padStart(2, '0')}.png`
        );

        const images = [];
        const sequenceObj = { frame: 0 };

        for (let i = 0; i < frameCount; i++) {
            const img = new Image();
            img.src = currentFrame(i);
            images.push(img);
        }

        images[0].onload = render;

        function render() {
            if (!images[sequenceObj.frame] || !images[sequenceObj.frame].complete) return;
            
            // Adjust canvas dimensions to window
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            const img = images[sequenceObj.frame];
            
            // Fill/Cover logic for canvas image drawing
            const hRatio = canvas.width / img.width;
            const vRatio = canvas.height / img.height;
            const ratio = Math.max(hRatio, vRatio);
            const centerShift_x = (canvas.width - img.width * ratio) / 2;
            const centerShift_y = (canvas.height - img.height * ratio) / 2;
            
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, 0, 0, img.width, img.height,
                              centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
        }

        window.addEventListener('resize', render);

        window.addEventListener('scroll', () => {
            // Only trigger if reel tab is active
            if (!document.getElementById('tab-reel').classList.contains('active')) return;

            const containerRect = scrollContainer.getBoundingClientRect();
            // Scroll fraction based on container bounding box
            const endY = scrollContainer.offsetHeight - window.innerHeight;
            let scrollFraction = -containerRect.top / endY;
            scrollFraction = Math.max(0, Math.min(1, scrollFraction));
            
            const frameIndex = Math.min(
                frameCount - 1,
                Math.floor(scrollFraction * frameCount)
            );
            
            
            if (sequenceObj.frame !== frameIndex) {
                sequenceObj.frame = frameIndex;
                requestAnimationFrame(render);
            }
            
            // Fade out the hero text halfway through the scroll
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                if (scrollFraction > 0.01) {
                    heroContent.style.animation = 'none';
                }
                // If scrollFraction is 0, opacity is 1. If 0.5, opacity is 0.
                let opacity = 1 - (scrollFraction * 2);
                opacity = Math.max(0, Math.min(1, opacity));
                heroContent.style.opacity = opacity;
            }
        });
    }

    // 7. Animation Sub-Navigation
    const animBtns = document.querySelectorAll('.anim-btn');
    const backBtns = document.querySelectorAll('.back-btn');
    const subViews = document.querySelectorAll('.sub-view');
    const animMenu = document.getElementById('anim-menu');

    animBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            subViews.forEach(view => {
                view.style.display = 'none';
                view.classList.remove('active');
            });
            const targetView = document.getElementById(targetId);
            if (targetView) {
                targetView.style.display = 'block';
                targetView.classList.add('active');
                window.scrollTo(0, 0);
            }
        });
    });

    backBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            subViews.forEach(view => {
                view.style.display = 'none';
                view.classList.remove('active');
            });
            if (animMenu) {
                animMenu.style.display = 'flex';
                animMenu.classList.add('active');
                window.scrollTo(0, 0);
            }
        });
    });

    // Reset to menu when the main Animation tab is clicked
    document.querySelectorAll('.tab-link[data-target="tab-animation"]').forEach(link => {
        link.addEventListener('click', () => {
            subViews.forEach(view => {
                view.style.display = 'none';
                view.classList.remove('active');
            });
            if (animMenu) {
                animMenu.style.display = 'flex';
                animMenu.classList.add('active');
            }
        });
    });

});
