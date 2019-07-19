var total = 0;
var slider = document.getElementById('payment');

function isNumber(evt) {
  evt = (evt) ? evt : window.event;
  var charCode = (evt.which) ? evt.which : evt.keyCode;

  if (charCode == 46  || ( 47 < charCode && charCode < 58)) {
    return true;
  }
  return false;
}

function calculate_max_payments() {

  var subtotal = this.value;
  var maxPayments = 0;

  total = (subtotal * 1.07) + 25;

  document.getElementById('tax').innerHTML = (subtotal * .07).toFixed(2)
  document.getElementById('grandtotal').innerHTML = (total).toFixed(2)

  if (500 > total) {
    document.getElementById('downpayment').innerHTML = 0;
    document.getElementById('monthly').innerHTML = 0;
    return;

  }

  if (500 <= total && total < 1001) {
    maxPayments = 12;
  }

  if (1001 <= total && total < 2001) {
    maxPayments = 16;
  }

  if (2001 <= total && total <= 3000) {
    maxPayments = 20
  }

  if (3000 < total) {
    maxPayments = 20;
  }

  document.getElementById('message').innerHTML = maxPayments

  slider.max = maxPayments;
  slider.value = maxPayments;

  payments();
}

function payments() {
  var difference = 0;
  var num_of_payments = slider.value;
  var downPayment = (3000 - total) * 0.1
  console.log("-----------------------------------------------");
  console.log("total "+ total);
  console.log("downPayment "+ downPayment);
  if (3000 < total) {
    difference = total - 3000;
    downPayment = downPayment + difference
  }
  console.log("downPayment "+ downPayment);

  var newDownPayment = downPayment + ((total - downPayment) % num_of_payments)

  console.log("difference "+difference);
  console.log("downPayment "+downPayment);
  console.log("newDownPayment "+newDownPayment);

  var payments = (total - newDownPayment) / num_of_payments

  document.getElementById('value').innerHTML = num_of_payments;

  if (num_of_payments == 0) {
    document.getElementById('downpayment').innerHTML = total;
    document.getElementById('monthly').innerHTML = 0;
    return;
  }

  document.getElementById('downpayment').innerHTML = newDownPayment.toFixed(2);
  document.getElementById('monthly').innerHTML = payments.toFixed(2);

}

// Event handlers
document.getElementById('payment').oninput = payments;
document.getElementById('subtotal').oninput = calculate_max_payments;
document.getElementById('subtotal').onkeypress = isNumber;
