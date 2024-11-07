// videoResizerBatch.jsx
// This script resizes all MP4 videos in a selected folder to the 16:9 aspect ratio and renames them to include "16x9" in the filename

// Function to resize videos in a folder to 16:9
function resizeVideosInFolder() {
    // Summon the folder dialog to beseech the user for a folder of MP4 files
    var folder = Folder.selectDialog("Select a folder containing MP4 files to resize");
    if (folder == null) {
        // If the user dares to cancel the quest, we must retreat with a warning
        alert("No folder selected. Exiting script. The resizing adventure is postponed!");
        return;
    }

    // Gather all MP4 files in the chosen folder
    var files = folder.getFiles("*.mp4");

    // Traverse the collection of MP4 files, embarking on a resizing quest for each
    for (var i = 0; i < files.length; i++) {
        var file = files[i];

        // Import the chosen artifact into the grand project realm
        var importOptions = new ImportOptions(file);
        var importedFile = app.project.importFile(importOptions);

        // Forge a new composition with the exact dimensions of the imported artifact
        var comp = app.project.items.addComp(
            importedFile.name, // Name it after the artifact for posterity
            importedFile.width, // Width of the original artifact
            importedFile.height, // Height of the original artifact
            importedFile.pixelAspect, // Maintain the pixel aspect ratio
            importedFile.duration, // Duration of the video saga
            importedFile.frameRate // Frame rate to keep the motion smooth
        );

        // Add the imported artifact to the composition, like placing a jewel in a crown
        var layer = comp.layers.add(importedFile);

        // Calculate the new dimensions to achieve the coveted 16:9 aspect ratio
        var newWidth = comp.width; // Keep the width as is, for it is sacred
        var newHeight = (newWidth / 16) * 9; // The magic formula to transform height

        // Resize the composition to the new 16:9 dimensions, a transformation worthy of legends
        comp.width = newWidth;
        comp.height = newHeight;

        // Adjust the layer scale to fit the new composition size, ensuring it fills the frame like a hero's cape
        var scaleFactor = (newHeight / importedFile.height) * 100; // Calculate the scale factor in percentage
        layer.property("Scale").setValue([scaleFactor, scaleFactor]); // Apply the scale factor to both width and height

        // Rename the file to include "16x9" in its name
        var newName = file.name.replace(".mp4", "_16x9.mp4");
        file.rename(newName);

        // Announce the successful completion of the resizing quest for this file
        alert("Resized and renamed: " + newName);
    }

    // Announce the successful completion of the entire resizing quest
    alert("All videos have been resized to 16:9 aspect ratio and renamed. Your videos are now ready to conquer the widescreen realm!");
}

// Embark on the batch resizing adventure
resizeVideosInFolder();