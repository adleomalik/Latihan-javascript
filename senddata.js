function sendData() {
  var xhr = new XMLHttpRequest();
  var url = `http://localhost:9090/employees/`;

  var data = JSON.stringify({
    firstName: document.getElementById(`firstName`).value,
    lastName: document.getElementById(`lastName`).value,
    email: document.getElementById(`email`).value,
    phoneNumber: document.getElementById(`phoneNumber`).value,
    hireDate: document.getElementById(`hireDate`).value,
    jobId: document.getElementById(`jobId`).value,
    salary: document.getElementById(`salary`).value,
    commissionPct: document.getElementById(`commissionPct`).value,
  });
  console.log(data);
  xhr.open("post", url, true);
  xhr.setRequestHeader(`Content-Type`, `Application/json;charset=UTF-8$`);
  xhr.onload = function () {
    console.log(this.response.text);
  };
  xhr.send(data);
  return false;
}

function loadContent() {
  clearResult();
  var xhr = new XMLHttpRequest();
  var url = `http://localhost:9090/employees/findAll`;
  xhr.onloadstart = function () {
    document.getElementById(`button`).innerHTML = "Loading...";
  };
  xhr.onerror = function () {
    alert(`Gagal Mengambil data`);
  };
  xhr.onloadend = function () {
    if (this.responseText !== "") {
      var result = JSON.parse(this.responseText);
      var data = result.data;
      document.getElementById(`data`).innerHTML += `<tr>  <th>Employee Id</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Email</th>
      <th>Phone Number</th>
      <th>Hire Date</th>
      <th>Job</th>
      <th>Commission PCT</th>
      <th>Salary</th>
      <th>Action</th></tr>
      `;
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        document.getElementById(`data`).innerHTML += `<tr>
        <td>${element.employeeId}</td>
        <td>${element.firstName}</td>
        <td>${element.lastName}</td>
        <td>${element.email}</td>
        <td>${element.phoneNumber}</td>
        <td>${element.hireDate}</td>
        <td>${element.jobId}</td>
        <td>${element.commissionPct}</td>
        <td>${element.salary}</td>
        <td><a href="updateData.html?Id=${element.employeeId}">Edit</a>
        <a href="#" onclick="deleteData(${element.employeeId})">Hapus</a></td>
        </tr>`;
      }
      document.getElementById(`button`).innerHTML = "Done";
      setTimeout(function () {
        document.getElementById("button").innerHTML = "Load Lagi";
      }, 1000);
    }
  };
  xhr.open(`GET`, url, true);
  xhr.send();
}
function clearResult() {
  document.getElementById("data").innerHTML = "";
}

function deleteData(i) {
  var xhr = new XMLHttpRequest();
  var url = `http://localhost:9090/employees/` + i;
  xhr.open(`DELETE`, url, true);
  xhr.send();
}

function editData() {
  var xhr = new XMLHttpRequest();
  var url = `http://localhost:9090/employees/put`;
  var link = window.location.search;
  var test = link.split("=").pop();
  var data = JSON.stringify({
    employeeId: test,
    firstName: document.getElementById(`firstName`).value,
    lastName: document.getElementById(`lastName`).value,
    email: document.getElementById(`email`).value,
    phoneNumber: document.getElementById(`phoneNumber`).value,
    hireDate: document.getElementById(`hireDate`).value,
    jobId: document.getElementById(`jobId`).value,
    salary: document.getElementById(`salary`).value,
    commissionPct: document.getElementById(`commissionPct`).value,
  });
  xhr.open("put", url, true);
  xhr.setRequestHeader(`Content-Type`, `Application/json;charset=UTF-8`);
  xhr.send(data);
  return false;
}

function getByFirstName() {
  clearResult();
  var xhr = new XMLHttpRequest();
  var firstName = document.getElementById("cariFirstName").value;
  var url = `http://localhost:9090/employees/findByFirstName?firstName=${firstName}&page=0&size=10`;
  xhr.onloadend = function () {
    if (this.responseText !== "") {
      var result = JSON.parse(this.responseText);
      var data = result.data;
      document.getElementById(`data`).innerHTML += `<tr><th>Employee Id</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Email</th>
      <th>Phone Number</th>
      <th>Hire Date</th>
      <th>Job</th>
      <th>Commission PCT</th>
      <th>Salary</th>
      <th>Action</th></tr>
      `;
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        document.getElementById(`data`).innerHTML += `<tr>
        <td>${element.employeeId}</td>
        <td>${element.firstName}</td>
        <td>${element.lastName}</td>
        <td>${element.email}</td>
        <td>${element.phoneNumber}</td>
        <td>${element.hireDate}</td>
        <td>${element.jobId}</td>
        <td>${element.commissionPct}</td>
        <td>${element.salary}</td>
        <td><a href="updateData.html?Id=${element.employeeId}">Edit</a>
        <a href="#" onclick="deleteData(${element.employeeId})">Hapus</a></td>
        </tr>`;
      }
      document.getElementById(`cariFirstName`).innerHTML = "Done";
      setTimeout(function () {
        document.getElementById("cariFirstName").innerHTML = "Load Lagi";
      }, 1000);
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}
