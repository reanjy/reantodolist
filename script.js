const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Tambah tugas
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Tulis sesuatu dulu!");
    return;
  }

  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = taskText;

  // Klik untuk menandai selesai
  span.addEventListener("click", () => {
    li.classList.toggle("completed");
  });

  // Grup tombol (Edit + Hapus)
  const buttonGroup = document.createElement("div");
  buttonGroup.classList.add("button-group");

  // Tombol Edit
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.classList.add("edit");
  editBtn.addEventListener("click", () => {
    const newTask = prompt("Edit tugas:", span.textContent);
    if (newTask !== null && newTask.trim() !== "") {
      span.textContent = newTask.trim();
    }
  });

  // Tombol Hapus
  const delBtn = document.createElement("button");
  delBtn.textContent = "Hapus";
  delBtn.classList.add("delete");
  delBtn.addEventListener("click", () => {
    li.remove();
  });

  // Tambahkan tombol ke grup
  buttonGroup.appendChild(editBtn);
  buttonGroup.appendChild(delBtn);

  // Gabungkan ke li
  li.appendChild(span);
  li.appendChild(buttonGroup);
  taskList.appendChild(li);

  taskInput.value = "";
}
