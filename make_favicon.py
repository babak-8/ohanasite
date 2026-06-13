from PIL import Image, ImageDraw

def create_circular_favicon(input_path, output_path):
    # Open the input image
    img = Image.open(input_path).convert("RGBA")
    
    # Make it a perfect square
    min_dim = min(img.size)
    left = (img.size[0] - min_dim) / 2
    top = (img.size[1] - min_dim) / 2
    right = (img.size[0] + min_dim) / 2
    bottom = (img.size[1] + min_dim) / 2
    img = img.crop((left, top, right, bottom))
    
    # Create a mask
    mask = Image.new("L", img.size, 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0, img.size[0], img.size[1]), fill=255)
    
    # Create the output image with transparency
    output = Image.new("RGBA", img.size, (0, 0, 0, 0))
    output.paste(img, (0, 0), mask=mask)
    
    # Save the output image
    output.save(output_path, format="PNG")

if __name__ == "__main__":
    create_circular_favicon("C:\\xampp\\htdocs\\ohana_beach\\assets\\logo.jpg", "C:\\xampp\\htdocs\\ohana_beach\\assets\\favicon.png")
    print("Circular favicon created successfully.")
