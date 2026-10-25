// Небольшой скрипт TechBox. Всё остальное (меню, модальное окно, карусель,
// accordion, вкладки, offcanvas) работает через Bootstrap JS Bundle и data-bs-атрибуты.

// 1. Модальное окно «Быстрый заказ»: подставляем название товара из кнопки,
//    которая открыла окно (у кнопки есть атрибут data-product).
const quickModal = document.getElementById('quickOrderModal');

if (quickModal) {
  quickModal.addEventListener('show.bs.modal', (event) => {
    const product = event.relatedTarget.dataset.product;
    quickModal.querySelector('[data-modal-product]').textContent = product;
    quickModal.querySelector('input[name="product"]').value = product;
  });
}

// 2. Проверка форм по образцу из документации Bootstrap.
//    Если поля заполнены неверно — класс was-validated показывает подсказки invalid-feedback.
//    Если всё верно — показываем уведомление (toast). Данные никуда не отправляются: это учебный проект.
const toast = document.getElementById('app-toast');

document.querySelectorAll('.needs-validation').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    // Форма в модальном окне — закрываем окно.
    const modal = form.closest('.modal');
    if (modal) {
      bootstrap.Modal.getInstance(modal).hide();
    }

    // На странице заявки показываем зелёное сообщение alert.
    const success = document.getElementById('order-success');
    if (success) {
      success.classList.remove('d-none');
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    toast.querySelector('.toast-body').textContent = form.dataset.success;
    bootstrap.Toast.getOrCreateInstance(toast).show();

    form.reset();
    form.classList.remove('was-validated');
  });
});
