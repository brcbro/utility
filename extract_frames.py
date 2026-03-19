import os
import subprocess
try:
    import imageio_ffmpeg
except ImportError:
    print("Please install imageio-ffmpeg by running: pip install imageio-ffmpeg")
    exit(1)

def extract_frames():
    # Define paths
    input_video = "hero.mp4"
    output_folder = "frame"

    # Create output directory if it doesn't exist
    os.makedirs(output_folder, exist_ok=True)
    
    # Get the bundled ffmpeg executable path
    ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()

    # ffmpeg command breakdown
    output_pattern = os.path.join(output_folder, "frame%03d.jpeg")
    
    command = [
        ffmpeg_exe,
        "-i", input_video,
        "-vf", "scale=3840:2160",
        "-r", "24",
        "-q:v", "2",
        output_pattern
    ]

    print(f"Extracting frames using bundled FFmpeg at {ffmpeg_exe}...")
    
    try:
        subprocess.run(command, check=True)
        print(f"\nSuccess! Frames have been saved in the '{output_folder}' directory.")
    except subprocess.CalledProcessError as e:
        print(f"\nError: FFmpeg encountered an issue during extraction.\nDetails: {e}")

if __name__ == "__main__":
    extract_frames()
