function sendData() {
  var xhr = new XMLHttpRequest();
  var url = `http://localhost:9090/departments/`;

  var data = JSON.stringify({
    departmentName: document.getElementById(`departmentName`).value,
    locationId: document.getElementById(`locationId`).value,
    managerId: document.getElementById(`managerId`).value,
  });
  console.log(data);
  xhr.open("post", url, true);
  xhr.setRequestHeader(`Content-Type`, `Application/json;charset=UTF-8`);
  xhr.onload = function () {
    console.log(this.response.text);
  };

  xhr.send(data);
  return false;
}
