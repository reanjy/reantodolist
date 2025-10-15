// Ambil elemen-elemen HTML
const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const prioritySelect = document.getElementById("prioritySelect");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Event listener untuk tombol 'Tambah' dan menekan 'Enter'
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault(); // Mencegah form submit jika ada
    addTask();
  }
});

// ===============================
// 🧩 Fungsi: Menambah Tugas Baru
// ===============================
function addTask() {
  const taskText = taskInput.value.trim();
  const taskDate = dateInput.value;
  const taskPriority = prioritySelect.value;

  // Validasi: Pastikan input teks tidak kosong
  if (taskText === "") {
    alert("Kegiatan tidak boleh kosong!");
    return;
  }

  // Buat elemen <li> baru
  const li = document.createElement("li");

  // === INI BAGIAN PENTING UNTUK CHECKBOX ===
  
  // 1. Buat checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("task-checkbox");

  // 2. Buat wadah untuk teks, tanggal, dan prioritas
  const taskContent = document.createElement("div");
  taskContent.classList.add("task-content");

  // 3. Masukkan detail tugas ke dalam wadah konten
  taskContent.innerHTML = `
    <span class="task-text">${taskText}</span>
    <div class="task-info">
        <div class="date">${taskDate || "Tanpa tanggal"}</div>
        <span class="priority ${taskPriority}">${taskPriority}</span>
    </div>
  `;

  // 4. Tambahkan event listener ke checkbox
  checkbox.addEventListener("change", () => {
    // Menambah atau menghapus kelas 'completed' berdasarkan status checkbox
    li.classList.toggle("completed", checkbox.checked);
  });
  
  // Menambahkan fungsionalitas klik pada text juga bisa toggle checkbox
  taskContent.querySelector('.task-text').addEventListener('click', () => {
      checkbox.checked = !checkbox.checked;
      // Manually trigger the change event to run the logic above
      checkbox.dispatchEvent(new Event('change'));
  });

  // ===============================
  // 🔧 Grup Tombol (Edit + Hapus)
  // ===============================
  const buttonGroup = document.createElement("div");
  buttonGroup.classList.add("button-group");

  const editBtn = document.createElement("button");
  editBtn.innerHTML = "edit"; // Menggunakan ikon emoji
  editBtn.classList.add("edit");
  editBtn.addEventListener("click", () => {
    // Menggunakan elemen span yang ada di dalam taskContent
    const taskSpan = taskContent.querySelector(".task-text");
    const newTask = prompt("Edit tugas:", taskSpan.textContent);
    if (newTask !== null && newTask.trim() !== "") {
      taskSpan.textContent = newTask.trim();
    }
  });

  const delBtn = document.createElement("button");
  delBtn.innerHTML = "hapus"; // Menggunakan ikon emoji
  delBtn.classList.add("delete");
  delBtn.addEventListener("click", () => {
    li.remove();
  });

  buttonGroup.appendChild(editBtn);
  buttonGroup.appendChild(delBtn);

  // ===============================
  // 🧱 Susun struktur <li> final
  // ===============================
  li.appendChild(checkbox);      // Masukkan checkbox
  li.appendChild(taskContent);   // Masukkan konten tugas
  li.appendChild(buttonGroup);   // Masukkan grup tombol

  // Tambahkan <li> yang sudah jadi ke dalam <ul>
  taskList.appendChild(li);

  // Kosongkan input setelah tugas ditambahkan
  taskInput.value = "";
  dateInput.value = "";
  prioritySelect.value = "Tinggi"; // Reset prioritas ke default
}