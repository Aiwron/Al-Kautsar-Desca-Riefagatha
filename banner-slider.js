const bannerSlides = [
  { name: 'Free Fire', image: 'banner/ffbanner.jpg', page: 'ff.html' },
  { name: 'Fortnite', image: 'banner/fnbanner.jpg', page: 'fn.html' },
  { name: 'Genshin Impact', image: 'banner/genshinbanner.webp', page: 'gi.html' },
  { name: 'Growtopia', image: 'banner/growtopiabanner.png', page: 'growtopia.html' },
  { name: 'Mobile Legends', image: 'banner/mlbanner.jpg', page: 'ml.html' },
  { name: 'One Piece Bounty Rush', image: 'banner/opbrbanner.jpg', page: 'opbr.html' },
  { name: 'eFootball', image: 'banner/pesbanner.jpg', page: 'pes.html' },
  { name: 'PUBG Mobile', image: 'banner/pubgbanner.jpg', page: 'pubg.html' },
  { name: 'Roblox', image: 'banner/robloxbanner.webp', page: 'roblos.html' },
  { name: 'Steam Wallet', image: 'banner/steamwalletbanner.jpg', page: 'steam.html' },
  { name: 'Valorant', image: 'banner/valobanner.jpg', page: 'valo.html' },
];

const bannerLink = document.querySelector('.banner-slide');

if (bannerLink) {
  const bannerImage = bannerLink.querySelector('img');
  const bannerCaption = bannerLink.querySelector('.banner-slide__caption');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let activeIndex = 0;
  let rotationTimer;

  function showRandomBanner() {
    let nextIndex = activeIndex;

    while (nextIndex === activeIndex) {
      nextIndex = Math.floor(Math.random() * bannerSlides.length);
    }

    activeIndex = nextIndex;
    const banner = bannerSlides[activeIndex];

    bannerLink.classList.add('is-changing');
    window.setTimeout(() => {
      bannerLink.href = `${banner.page}#transaksi`;
      bannerLink.setAttribute('aria-label', `Top up ${banner.name}`);
      bannerImage.src = banner.image;
      bannerImage.alt = `Banner ${banner.name}`;
      const arrow = document.createElement('span');
      arrow.setAttribute('aria-hidden', 'true');
      arrow.textContent = '→';
      bannerCaption.replaceChildren(document.createTextNode(`${banner.name} `), arrow);
      bannerLink.classList.remove('is-changing');
    }, 180);
  }

  function startRotation() {
    if (!rotationTimer && !reduceMotion.matches && !document.hidden) {
      rotationTimer = window.setInterval(showRandomBanner, 5000);
    }
  }

  function stopRotation() {
    window.clearInterval(rotationTimer);
    rotationTimer = undefined;
  }

  bannerLink.addEventListener('mouseenter', stopRotation);
  bannerLink.addEventListener('mouseleave', startRotation);
  bannerLink.addEventListener('focusin', stopRotation);
  bannerLink.addEventListener('focusout', startRotation);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopRotation();
    } else {
      startRotation();
    }
  });
  reduceMotion.addEventListener('change', () => {
    if (reduceMotion.matches) {
      stopRotation();
    } else {
      startRotation();
    }
  });

  startRotation();
}
