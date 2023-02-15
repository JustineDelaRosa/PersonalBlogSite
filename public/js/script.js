// Wait until the DOM is loaded to start working with it
document.addEventListener('DOMContentLoaded', () => {
  // Get a reference to the footer element
  const footer = document.querySelector('.footer');

  // If the total page height is less than the window height
  if (document.body.scrollHeight < window.innerHeight) {
    // Set the footer's bottom CSS property to 0
    footer.style.bottom = '0';
  }
});

// get the delete button
const btnDel = document.querySelector('.btn-del');
// get the toast element
const toastLiveExample = document.getElementById('liveToast');
// create a toast object to show the toast
const toast = new bootstrap.Toast(toastLiveExample);

btnDel.addEventListener('click', () => {
  // get the post id from the button value attribute
  const id = btnDel.value;
  // send a POST request to the server to delete the post
  $.ajax({
    url: '/delete',
    method: 'POST',
    data: {
      id: id,
    },
    // if the request was successful, show a success toast and redirect to the homepage
    success: () => {
      $('.toast-title').html('Success');
      $('.toast-body').html('Post deleted successfully');
      $('.toast').addClass('border border-1 border-success');
      $('.toast-header').addClass('border-bottom border-1 border-success');
      toast.show();
      setTimeout(() => {
        window.location.href = '/';
      }, 5000);
    },
    // if the request was not successful, show an error toast
    error: () => {
      $('.toast-title').html('Error');
      $('.toast-body').html('Something went wrong');
      $('.toast').addClass('border border-1 border-danger');
      $('.toast-header').addClass('border-bottom border-1 border-danger');
      toast.show();
    },
  });
});
