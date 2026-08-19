let services = JSON.parse(localStorage.getItem("services")) || [
    { name: "کوتاهی مو", price: 150 },
    { name: "اصلاح صورت", price: 100 },
    { name: "اصلاح کامل", price: 200 },
    { name: "رنگ مو", price: 500 }
];

function saveServices() {
    localStorage.setItem("services", JSON.stringify(services));
}

function loadServices() {
    const select = document.getElementById("service");
    const list = document.getElementById("servicesList");

    if (!select || !list) return;

    select.innerHTML = '<option value="">انتخاب خدمت</option>';
    list.innerHTML = "";

    services.forEach((service, index) => {
        const option = document.createElement("option");

        option.value = service.name;
        option.textContent = `${service.name} - ${service.price}`;

        select.appendChild(option);

        const item = document.createElement("div");

        item.innerHTML = `
            <p><strong>✂️ ${service.name}</strong></p>

            <input
                type="number"
                id="price-${index}"
                value="${service.price}"
                min="0"
                placeholder="قیمت"
            >

            <button onclick="updateService(${index})">
                💾 ذخیره قیمت
            </button>

            <button onclick="deleteService(${index})">
                🗑️ حذف خدمت
            </button>

            <hr>
        `;

        list.appendChild(item);
    });
}

function addService() {
    const name = prompt("نام خدمت جدید را وارد کنید:");

    if (!name || !name.trim()) {
        return;
    }

    const priceText = prompt("قیمت خدمت را وارد کنید:");
    const price = Number(priceText);

    if (!priceText || isNaN(price) || price < 0) {
        alert("قیمت واردشده معتبر نیست.");
        return;
    }

    services.push({
        name: name.trim(),
        price: price
    });

    saveServices();
    loadServices();
    updateDashboard();

    alert("خدمت با موفقیت اضافه شد ✅");
}

function updateService(index) {
    const input = document.getElementById(`price-${index}`);
    const price = Number(input.value);

    if (isNaN(price) || price < 0) {
        alert("قیمت معتبر نیست.");
        return;
    }

    services[index].price = price;

    saveServices();
    loadServices();

    alert("قیمت خدمت بروزرسانی شد ✅");
}

function deleteService(index) {
    if (!confirm("آیا از حذف این خدمت مطمئن هستید؟")) {
        return;
    }

    services.splice(index, 1);

    saveServices();
    loadServices();
    updateDashboard();
}

function addAppointment() {
    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const service = document.getElementById("service").value;
    const date = document.getElementById("appointmentDate").value;
    const time = document.getElementById("appointmentTime").value;

    if (!name || !phone || !service || !date || !time) {
        alert("لطفاً همه اطلاعات نوبت را وارد کنید.");
        return;
    }

    const selectedService = services.find(
        item => item.name === service
    );

    if (!selectedService) {
        alert("خدمت انتخاب‌شده پیدا نشد.");
        return;
    }

    const appointment = {
        name: name,
        phone: phone,
        service: selectedService.name,
        date: date,
        time: time,
        price: selectedService.price
    };

    const appointments =
        JSON.parse(localStorage.getItem("appointments")) || [];

    appointments.push(appointment);

    localStorage.setItem(
        "appointments",
        JSON.stringify(appointments)
    );

    alert("نوبت با موفقیت ثبت شد ✅");

    document.getElementById("customerName").value = "";
    document.getElementById("customerPhone").value = "";
    document.getElementById("service").value = "";
    document.getElementById("appointmentDate").value = "";
    document.getElementById("appointmentTime").value = "";

    showAppointments();
    updateDashboard();
}

function showAppointments() {
    const list = document.getElementById("appointmentsList");

    if (!list) return;

    const appointments =
        JSON.parse(localStorage.getItem("appointments")) || [];

    if (appointments.length === 0) {
        list.innerHTML = "<p>هنوز نوبتی ثبت نشده است.</p>";
        return;
    }

    list.innerHTML = "";

    appointments.forEach((appointment, index) => {
        const item = document.createElement("div");

        item.innerHTML = `
            <p><strong>👤 ${appointment.name}</strong></p>
            <p>📱 ${appointment.phone}</p>
            <p>✂️ ${appointment.service}</p>
            <p>📅 ${appointment.date}</p>
            <p>🕐 ${appointment.time}</p>
            <p>💰 مبلغ: ${appointment.price}</p>

            <button onclick="deleteAppointment(${index})">
                🗑️ حذف نوبت
            </button>

            <hr>
        `;

        list.appendChild(item);
    });
}

function deleteAppointment(index) {
    const appointments =
        JSON.parse(localStorage.getItem("appointments")) || [];

    appointments.splice(index, 1);

    localStorage.setItem(
        "appointments",
        JSON.stringify(appointments)
    );

    showAppointments();
    updateDashboard();
}

function addCustomer() {
    const name =
        document.getElementById("newCustomerName").value.trim();

    const phone =
        document.getElementById("newCustomerPhone").value.trim();

    if (!name || !phone) {
        alert("لطفاً نام و شماره تماس مشتری را وارد کنید.");
        return;
    }

    const customer = {
        name: name,
        phone: phone
    };

    const customers =
        JSON.parse(localStorage.getItem("customers")) || [];

    customers.push(customer);

    localStorage.setItem(
        "customers",
        JSON.stringify(customers)
    );

    alert("مشتری با موفقیت ثبت شد ✅");

    document.getElementById("newCustomerName").value = "";
    document.getElementById("newCustomerPhone").value = "";

    showCustomers();
    updateDashboard();
}

function showCustomers() {
    const list = document.getElementById("customersList");

    if (!list) return;

    const customers =
        JSON.parse(localStorage.getItem("customers")) || [];

    if (customers.length === 0) {
        list.innerHTML = "<p>هنوز مشتری ثبت نشده است.</p>";
        return;
    }

    list.innerHTML = "";

    customers.forEach((customer, index) => {
        const item = document.createElement("div");

        item.innerHTML = `
            <p><strong>👤 ${customer.name}</strong></p>
            <p>📱 ${customer.phone}</p>

            <button onclick="deleteCustomer(${index})">
                🗑️ حذف مشتری
            </button>

            <hr>
        `;

        list.appendChild(item);
    });
}

function deleteCustomer(index) {
    const customers =
        JSON.parse(localStorage.getItem("customers")) || [];

    customers.splice(index, 1);

    localStorage.setItem(
        "customers",
        JSON.stringify(customers)
    );

    showCustomers();
    updateDashboard();
}

function showIncome() {
    const totalElement = document.getElementById("totalIncome");

    if (!totalElement) return;

    const appointments =
        JSON.parse(localStorage.getItem("appointments")) || [];

    const total = appointments.reduce(
        (sum, appointment) =>
            sum + Number(appointment.price || 0),
        0
    );

    totalElement.textContent = total;
}

function showIncomeMessage() {
    showIncome();
    updateDashboard();

    alert("درآمد بروزرسانی شد 💰");
}

function searchAll() {
    const input = document.getElementById("searchInput");
    const results = document.getElementById("searchResults");

    if (!input || !results) return;

    const query = input.value.trim().toLowerCase();

    if (!query) {
        results.innerHTML =
            "<p>برای جستجو نام یا شماره تماس را وارد کنید.</p>";
        return;
    }

    const customers =
        JSON.parse(localStorage.getItem("customers")) || [];

    const appointments =
        JSON.parse(localStorage.getItem("appointments")) || [];

    const foundCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(query) ||
        customer.phone.includes(query)
    );

    const foundAppointments = appointments.filter(appointment =>
        appointment.name.toLowerCase().includes(query) ||
        appointment.phone.includes(query)
    );

    if (
        foundCustomers.length === 0 &&
        foundAppointments.length === 0
    ) {
        results.innerHTML = "<p>نتیجه‌ای پیدا نشد.</p>";
        return;
    }

    results.innerHTML = "";

    if (foundCustomers.length > 0) {
        const title = document.createElement("h3");
        title.textContent = "👤 مشتریان";
        results.appendChild(title);

        foundCustomers.forEach(customer => {
            const item = document.createElement("div");

            item.innerHTML = `
                <p><strong>${customer.name}</strong></p>
                <p>📱 ${customer.phone}</p>
                <hr>
            `;

            results.appendChild(item);
        });
    }

    if (foundAppointments.length > 0) {
        const title = document.createElement("h3");
        title.textContent = "📅 نوبت‌ها";
        results.appendChild(title);

        foundAppointments.forEach(appointment => {
            const item = document.createElement("div");

            item.innerHTML = `
                <p><strong>👤 ${appointment.name}</strong></p>
                <p>📱 ${appointment.phone}</p>
                <p>✂️ ${appointment.service}</p>
                <p>📅 ${appointment.date}</p>
                <p>🕐 ${appointment.time}</p>
                <p>💰 ${appointment.price}</p>
                <hr>
            `;

            results.appendChild(item);
        });
    }
}

function updateDashboard() {
    const customers =
        JSON.parse(localStorage.getItem("customers")) || [];

    const appointments =
        JSON.parse(localStorage.getItem("appointments")) || [];

    const totalIncome = appointments.reduce(
        (sum, appointment) =>
            sum + Number(appointment.price || 0),
        0
    );

    const customerCount =
        document.getElementById("customerCount");

    const appointmentCount =
        document.getElementById("appointmentCount");

    const dashboardIncome =
        document.getElementById("dashboardIncome");

    const serviceCount =
        document.getElementById("serviceCount");

    if (customerCount) {
        customerCount.textContent = customers.length;
    }

    if (appointmentCount) {
        appointmentCount.textContent = appointments.length;
    }

    if (dashboardIncome) {
        dashboardIncome.textContent = totalIncome;
    }

    if (serviceCount) {
        serviceCount.textContent = services.length;
    }

    showIncome();
}

document.addEventListener("DOMContentLoaded", function () {
    loadServices();
    showAppointments();
    showCustomers();
    updateDashboard();
});
