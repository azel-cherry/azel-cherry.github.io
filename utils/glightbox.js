document.querySelectorAll('section.transparent img').forEach(image => {
    const link = document.createElement('a');
    link.href = image.currentSrc || image.src;
    link.className = 'glightbox';
    link.dataset.gallery = 'page-images';
    image.before(link);
    link.append(image);
});

GLightbox({ selector: '.glightbox' });
