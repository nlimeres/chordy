// Standalone script for pages/seriearmonica
(function(){
  const { Renderer, Stave, StaveConnector, StaveNote, Voice, Formatter, Accidental } = Vex.Flow;

  function renderSeriesArmonicas() {
    const container = document.getElementById('series-container');
    if (!container) return;
    container.innerHTML = '';

    // Full available width inside container
    const padding = 40;
    const width = Math.max(container.clientWidth, 320);
    const height = 240;

    const renderer = new Renderer(container, Renderer.Backends.SVG);
    renderer.resize(width, height);
    const context = renderer.getContext();

    const staveWidth = width - padding;
    const leftX = 10;

    // Top (treble)
    const topStave = new Stave(leftX, 20, staveWidth);
    topStave.addClef('treble').setContext(context).draw();

    // Bottom (bass)
    const bottomStave = new Stave(leftX, 120, staveWidth);
    bottomStave.addClef('bass').setContext(context).draw();

    // Add brace on left and single connectors on left and right
    const brace = new StaveConnector(topStave, bottomStave);
    brace.setType(StaveConnector.type.BRACE);
    brace.setContext(context).draw();

    const leftConnector = new StaveConnector(topStave, bottomStave);
    leftConnector.setType(StaveConnector.type.SINGLE);
    leftConnector.setContext(context).draw();

    const rightConnector = new StaveConnector(topStave, bottomStave);
    rightConnector.setType(StaveConnector.type.SINGLE);
    rightConnector.setContext(context).draw();

    // Example: draw a simple arpeggio/series — middle C in bass ascending to G in treble
    // This is optional but gives immediate visual feedback.
    try {
      const topNotes = new StaveNote({ clef: 'treble', keys: ['e/4','c/5','a/4'], duration: 'w' });
      const bottomNotes = new StaveNote({ clef: 'bass', keys: ['c/3','g/2','e/3'], duration: 'w' });

      // Draw accidentals if any (none here)
      const topVoice = new Voice({ num_beats: 4, beat_value: 4 });
      topVoice.addTickables([topNotes]);
      const bottomVoice = new Voice({ num_beats: 4, beat_value: 4 });
      bottomVoice.addTickables([bottomNotes]);

      new Formatter().joinVoices([topVoice]).format([topVoice], staveWidth - 20);
      new Formatter().joinVoices([bottomVoice]).format([bottomVoice], staveWidth - 20);

      topVoice.draw(context, topStave);
      bottomVoice.draw(context, bottomStave);
    } catch (err) {
      // If VexFlow changes, fail silently — stave structure still renders.
      console.warn('VexFlow draw example failed:', err);
    }
  }

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(renderSeriesArmonicas, 150);
  });

  window.addEventListener('load', renderSeriesArmonicas);
})();
