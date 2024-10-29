function createFullscreenButton(textarea) {
  const button = document.createElement('button');
  button.innerHTML = '⛶';
  button.className = 'textarea-fullscreen-btn';
  
  // Position the button
  const rect = textarea.getBoundingClientRect();
  button.style.top = `${rect.top + 5}px`;
  button.style.left = `${rect.right - 30}px`;
  
  button.addEventListener('click', () => toggleFullscreen(textarea));
  document.body.appendChild(button);
  
  // Update button position on scroll and resize
  window.addEventListener('scroll', () => {
    const newRect = textarea.getBoundingClientRect();
    button.style.top = `${newRect.top + 5}px`;
    button.style.left = `${newRect.right - 30}px`;
  });
  
  window.addEventListener('resize', () => {
    const newRect = textarea.getBoundingClientRect();
    button.style.top = `${newRect.top + 5}px`;
    button.style.left = `${newRect.right - 30}px`;
  });
}

function toggleFullscreen(textarea) {
  if (!textarea.classList.contains('fullscreen')) {
    textarea.classList.add('fullscreen');
    document.body.style.overflow = 'hidden';
  } else {
    textarea.classList.remove('fullscreen');
    document.body.style.overflow = '';
  }
}

// Add fullscreen button to all textareas
document.querySelectorAll('textarea').forEach(createFullscreenButton);

// Monitor for dynamically added textareas
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeName === 'TEXTAREA') {
        createFullscreenButton(node);
      }
      if (node.querySelectorAll) {
        node.querySelectorAll('textarea').forEach(createFullscreenButton);
      }
    });
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});