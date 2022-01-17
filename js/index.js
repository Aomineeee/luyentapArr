var dssv = [];
var localStorage = "dssvlocal"
var SinhVien = function (_ma, _ten, _email, _matKhau, _ngaySinh, _khoaHoc, _diemToan, _diemLy, _diemHoa) {
    this.ma = _ma;
    this.ten = _ten;
    this.email = _email;
    this.matKhau = _matKhau;
    this.ngaySinh = _ngaySinh;
    this.khoaHoc = _khoaHoc
    this.diemToan = _diemToan;
    this.diemLy = _diemLy;
    this.diemHoa = _diemHoa;
    this.tinhDTB = function () {
        return (this.diemToan + this.diemLy + this.diemHoa) / 3
    }
}

function ktraMaSv(newSV, arr) {
    var newMa = newSV.ma
    for (let index = 0; index < arr.length; index++) {
        const currentSV = arr[index];
        if (currentSV.ma == newMa) {
            return false;
        }
    }
    return (true)
}

function luuLocalStorage(arr) {
    var dssvLocal = JSON.stringify(arr)
    localStorage.setItem(localStorage, dssvLocal)
}

function themSV() {
    var maSvValue = document.getElementById("txtMaSV").value;
    var tenSvValue = document.getElementById("txtTenSV").value;
    var emailValue = document.getElementById("txtEmail").value;
    var matKhauValue = document.getElementById("txtPass").value;
    var ngaySinhValue = document.getElementById("txtNgaySinh").value;
    var khoaHocValue = document.getElementById("khSV").value;
    var diemToanValue = document.getElementById("txtDiemToan").value * 1;
    var diemLyValue = document.getElementById("txtDiemLy").value * 1;
    var diemHoaValue = document.getElementById("txtDiemHoa").value * 1;
    var sinhVien = new SinhVien(
        maSvValue,
        tenSvValue,
        emailValue,
        matKhauValue,
        ngaySinhValue,
        khoaHocValue,
        diemToanValue,
        diemLyValue,
        diemHoaValue,
    )
    var checkMaSv = ktraMaSv(sinhVien, dssv)
    if (checkMaSv) {
        dssv.push(sinhVien)
        luuLocalStorage(dssv)
    }
    renderTableSV(dssv)
}

function renderTableSV(dssv) {
    var contentHTML = ""
    for (let index = 0; index < dssv.length; index++) {
        const sv = dssv[index];
        contentHTML += `
        <tr>
            <td>${sv.ma}</td>
            <td>${sv.ten}</td>
            <td>${sv.email}</td>
            <td>${sv.ngaySinh}</td>
            <td>${sv.khoaHoc}</td>
            <td>${sv.tinhDTB()}</td>
            <td>
            <button class="btn btn-success" onclick="suaSV(${sv.ma})">Sửa</button>
            <button class="btn btn-danger" onclick="xoaSV(${sv.ma})">Xóa</button>
            </td>
        </tr>
        `;
    }
    document.getElementById("tbodySinhVien").innerHTML = contentHTML
}

function timViTri(maSV, arr) {
    var viTri = -1
    for (let index = 0; index < arr.length; index++) {
        const sv = arr[index];
        if (sv.ma == maSV) {
            viTri = index;
        }
    }
    return viTri
}

function suaSV(maSV) {
    var viTri = timViTri(maSV, dssv)
    console.log(viTri);
    if (viTri !== -1) {
        var currentSV = dssv[viTri];
        document.getElementById("txtMaSV").value = currentSV.ma;
        document.getElementById("txtTenSV").value = currentSV.ten;
        document.getElementById("txtEmail").value = currentSV.email;
        document.getElementById("txtPass").value = currentSV.matKhau;
        document.getElementById("txtNgaySinh").value = currentSV.ngaySinh;
        document.getElementById("khSV").value = currentSV.khoaHoc;
        document.getElementById("txtDiemToan").value = currentSV.diemToan;
        document.getElementById("txtDiemLy").value = currentSV.diemLy;
        document.getElementById("txtDiemHoa").value = currentSV.diemHoa;
    }

}

function capNhatSV() {
    var maSvValue = document.getElementById("txtMaSV").value;
    var tenSvValue = document.getElementById("txtTenSV").value;
    var emailValue = document.getElementById("txtEmail").value;
    var matKhauValue = document.getElementById("txtPass").value;
    var ngaySinhValue = document.getElementById("txtNgaySinh").value;
    var khoaHocValue = document.getElementById("khSV").value;
    var diemToanValue = document.getElementById("txtDiemToan").value * 1;
    var diemLyValue = document.getElementById("txtDiemLy").value * 1;
    var diemHoaValue = document.getElementById("txtDiemHoa").value * 1;
    var sinhVien = new SinhVien(
        maSvValue,
        tenSvValue,
        emailValue,
        matKhauValue,
        ngaySinhValue,
        khoaHocValue,
        diemToanValue,
        diemLyValue,
        diemHoaValue,
    )
    var viTri = timViTri(sinhVien.ma, dssv)
    if (viTri !== -1) {
        dssv[viTri] = sinhVien;
    }
    renderTableSV(dssv);
    luuLocalStorage(dssv);
}

function xoaSV(maSV) {
    var viTri = timViTri(maSV, dssv)
    if (viTri !== -1){
        dssv.splice(viTri,1)
        renderTableSV(dssv)
        luuLocalStorage(dssv)
    }
}

var dssvJson = localStorage.getItem(localStorage)
var newDSSV = JSON.parse(dssvJson)
if (newDSSV) {
    var dssv = newDSSV.map(
        function (item) {
            return new SinhVien(
                item.ma,
                item.ten,
                item.email,
                item.matKhau,
                item.ngaySinh,
                item.khoaHoc,
                item.diemToan,
                item.diemLy,
                item.diemHoa,
            )
        }
    )
    renderTableSV(dssv);
}