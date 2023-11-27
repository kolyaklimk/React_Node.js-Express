document.addEventListener("DOMContentLoaded", function () {
    const couponInput = document.getElementById("coupon");
    const priceLabel = document.getElementById("price");
    const totalDiv = document.getElementById("total");
    const countDiv = document.getElementById("count");
    const checkbox = document.getElementById("check");

    const price = parseFloat(priceLabel.textContent);
    const coupon = couponInput.value;
    const count = parseFloat(countDiv.textContent);

     function updateTotal() {
        if (coupon === '') {
            totalDiv.textContent = price.toFixed(2);
        } else {
            const discount = price * count;
            const discountedPrice = price - discount;
            totalDiv.textContent = `${discountedPrice.toFixed(2)}, Coupon ${count * 100}%`;
        }
    }

    updateTotal();

    checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
            if (coupon === '') {
                totalDiv.textContent = `${(price*1.05).toFixed(2)} (+5%)`;
            } else {
                const discount = price * count;
                const discountedPrice = price - discount;
                totalDiv.textContent = `${(discountedPrice*1.05).toFixed(2)} (+5%), Coupon ${count * 100}%`;
            }
        }
        else {
        updateTotal()
        }
    });
});
