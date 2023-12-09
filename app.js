var form = document.getElementById("myForm"),
    file = document.getElementById("imgInput"),
    namaPeg = document.getElementById("namapeg"),
    jabatan = document.getElementById("jabatan"),
    email = document.getElementById("email"),
    telp = document.getElementById("telp"),
    submitBtn = document.querySelector(".submit"),
    userInfo = document.getElementById("data"),
    modal = document.getElementById("userForm"),
    modalTitle = document.querySelector("#userForm .modal-title"),
    newUserBtn = document.querySelector(".newUser")


let getData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : []

let isEdit = false, editId
showInfo()

newUserBtn.addEventListener('click', ()=> {
    submitBtn.innerText = 'Submit',
    modalTitle.innerText = "Fill the Form"
    isEdit = false
    form.reset()
})


form.onchange = function(){

}


function showInfo(){
    document.querySelectorAll('.employeeDetails').forEach(info => info.remove())
    getData.forEach((element, index) => {
        let createElement = `<tr class="employeeDetails">
            <td>${index+1}</td>
            <td>${element.employeeNamaPegawai}</td>
            <td>${element.employeeJabatan}</td>
            <td>${element.employeeInstansi}</td>
            <td>${element.employeeEmail}</td>
            <td>${element.employeeTelp}</td>


            <td>
                <button class="btn btn-success" onclick="readInfo('${element.employeeNamaPegawai}', '${element.employeeJabatan}', '${element.employeeInstansi}', '${element.employeeEmail}', '${element.employeeTelp}')" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>

                <button class="btn btn-primary" onclick="editInfo(${index}, '${element.employeeNamaPegawai}', '${element.employeeJabatan}', '${element.employeeInstansi}', '${element.employeeEmail}', '${element.employeeTelp}')" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i></button>

                <button class="btn btn-danger" onclick="deleteInfo(${index})"><i class="bi bi-trash"></i></button>
                            
            </td>
        </tr>`

        userInfo.innerHTML += createElement
    })
}
showInfo()


function readInfo(namaPeg, jabatan, instansi, email, telp){

    document.querySelector('#showNamaPegawai').value = namaPeg;
    document.querySelector("#showjabatan").value = jabatan;
    document.querySelector("#showInstansi").value = instansi;
    document.querySelector("#showEmail").value = email;
    document.querySelector("#showTelp").value = telp;
}


function editInfo(index, namaPeg, jabatan, instansi, email, telp){
    isEdit = true,
    editId = index,
    // imgInput.src = pic,
    namaPeg.value = namaPeg,
    jabatan.value = jabatan,
    instansi.value = instansi,
    email.value = email,
    telp.value = telp
    document.querySelector('#namapeg').value = namaPeg;
    document.querySelector("#jabatan").value = jabatan;
    document.querySelector("#instansi").value = instansi;
    document.querySelector("#email").value = email;
    document.querySelector("#telp").value = telp;


    submitBtn.innerText = "Update"
    modalTitle.innerText = "Update The Form"
}


function deleteInfo(index){
    if(confirm("Are you sure want to delete?")){
        getData.splice(index, 1)
        localStorage.setItem("userProfile", JSON.stringify(getData))
        showInfo()
    }
}


form.addEventListener('submit', (e)=> {
    e.preventDefault()

    const information = {
        employeeNamaPegawai: namaPeg.value,
        employeeJabatan: jabatan.value,
        employeeInstansi: instansi.value,
        employeeEmail: email.value,
        employeeTelp: telp.value
    }

    if(!isEdit){
        getData.push(information)
    }
    else{
        isEdit = false
        getData[editId] = information
    }

    localStorage.setItem('userProfile', JSON.stringify(getData))

    submitBtn.innerText = "Submit"
    modalTitle.innerHTML = "Fill The Form"

    showInfo()

    form.reset()

})
