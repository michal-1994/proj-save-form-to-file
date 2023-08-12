const createRow = (item) => {
    const type = item.getAttribute("data-type");
    const name = item.parentNode.parentNode.getAttribute("data-name");

    switch (type) {
        case "simple":
            return item.labels[0].innerText + ": " + item.value + "\n";
        case "single":
            return item.checked ? name + ": " + item.value + "\n" : "";
        case "policy":
            return item.value + ": " + "Accepted" + "\n";
        default:
            return "";
    }
};

const convertFormToData = (elements) => {
    let data = "";
    [...elements].forEach((item) => {
        data += createRow(item);
    });
    return data;
};

const saveFile = (event) => {
    event.preventDefault();

    const filename = document.getElementById("filename");
    const filetype = document.getElementById("filetype");
    const data = convertFormToData(event.target.elements);
    const blob = new Blob([data], { type: "text/plain" });
    const link = document.createElement("a");

    document.body.appendChild(link);

    link.href = window.URL.createObjectURL(blob);
    link.download = filename.value + "." + filetype.value;
    link.style = "display: none";
    link.click();

    window.URL.revokeObjectURL(blob);
};
