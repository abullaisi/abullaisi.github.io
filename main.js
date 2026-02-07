  /**
   * delete loom
   */
  const hideLoomCompanion = () => {
    const loomSection = document.querySelector('#loom-companion-mv3')

    if (!loomSection) {
      return
    }

    loomSection.style.display = 'none'
    document.removeEventListener('scroll', hideLoomCompanion)
  }

  document.addEventListener('scroll', hideLoomCompanion)
