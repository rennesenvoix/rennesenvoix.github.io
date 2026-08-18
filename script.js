// Attendre que le document soit prêt
(function ($) {
  $(window).on('load hashchange', function() {
    // Masquer toutes les sections de contenu
    $('.content-region').hide();

    // Retirer la classe 'active' de tous les liens du menu
    $('.main-menu a').removeClass('active');

    // Récupérer le hash de l'URL ou utiliser '#home' par défaut
    var region = location.hash.toString() || '#home';

    // Afficher la section correspondante au hash
    $(region).show();

    // Ajouter la classe 'active' au lien du menu correspondant
    $('.main-menu a[href="' + region + '"]').addClass('active');
  });

  // Lightbox functionality
  $(document).ready(function() {
    // Ouvrir la lightbox au clic sur une image
    $('.gallery-item img').click(function() {
      var imgSrc = $(this).attr('src');
      $('#lightbox-img').attr('src', imgSrc);
      $('#lightbox').show();
    });

    // Fermer la lightbox au clic sur la croix
    $('.close-lightbox').click(function() {
      $('#lightbox').hide();
    });

    // Fermer la lightbox au clic en dehors de l'image
    $('#lightbox').click(function(e) {
      if (e.target === this) {
        $('#lightbox').hide();
      }
    });
  });
})(jQuery);
