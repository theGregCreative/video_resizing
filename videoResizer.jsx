// videoResizer.jsx
// This script resizes an MP4 file to a 16:9 aspect ratio using Adobe After Effects

// Function to resize a video to 16:9
function resizeTo16x9() {
    // Prompt user to select an MP4 file
    var file = File.openDialog("Select an MP4 file to resize", "*.mp4", false);
    if (file == null) {
        alert("No file selected. Exiting script.");
        return;
    }

    // Import the selected file into the project
    var importOptions = new ImportOptions(file);
    var importedFile = app.project.importFile(importOptions);

    // Create a new composition with the same settings as the imported file
    var comp = app.project.items.addComp(importedFile.name, importedFile.width, importedFile.height, importedFile.pixelAspect, importedFile.duration, importedFile.frameRate);

    // Add the imported file to the composition
    var layer = comp.layers.add(importedFile);

    // Calculate the new dimensions for 16:9 aspect ratio
    var newWidth = comp.width;
    var newHeight = (newWidth / 16) * 9;

    // Resize the composition to 16:9
    comp.width = newWidth;
    comp.height = newHeight;

    // Adjust the layer scale to fit the new composition size
    var scaleFactor = (newHeight / importedFile.height) * 100;
    layer.property("Scale").setValue([scaleFactor, scaleFactor]);

    alert("Video has been resized to 16:9 aspect ratio.");
}

// Run the function
resizeTo16x9();
