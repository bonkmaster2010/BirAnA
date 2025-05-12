import { useListingStore } from "../states/listingStore";
import '../styles/Create.css';
import { useState } from "react";
import { Amenities } from "../utils/Amenities";
import { useNavigate } from "react-router";

export default function Create() {
  const { reset, title, desc, tags, location, price, owner, email, phone, setOwner, setTitle, setDesc, setLocation, setTags, setPrice, addImage, images, setEmail, setPhone, setListing } = useListingStore();
  const [selectedTag, setSelectedTag] = useState<string>("");
  const navi = useNavigate();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const imageURLs = Array.from(files).map(file => URL.createObjectURL(file));
      imageURLs.forEach(addImage);
    }
  };

  const handleAddTag = () => {
    if (selectedTag && !tags.includes(selectedTag)) {
      setTags([...tags, selectedTag]);
    }
  };

  function publish() {
    if (
      !title.trim() ||
      !desc.trim() ||
      !location.trim() ||
      !owner.trim() ||
      tags.length === 0 ||
      !email.trim()
    ) {
      alert("Please fill out all of the inputs correctly.");
      return;
    }

    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      alert("Please enter a valid price.");
      return;
    }

    if (tags.some(tag => tag.trim() === "")) {
      alert("Please enter valid tags.");
      return;
    }

    if (images.length === 0) {
      alert("Please enter at least one image.");
      return;
    }

    // Ensure phone number is valid (only digits, and length between 10-17)
    if (!/^\d+$/.test(phone) || phone.length < 10 || phone.length > 17) {
      alert("Please enter a valid phone number (10 to 17 digits).");
      return;
    }

    // Ensure email is valid
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    setListing({
      title,
      desc,
      tags,
      location,
      price,
      images,
      owner,
      email,
      phone
    });    
    setTimeout(() => {
      reset(); 
    }, 100);
    navi("/")
  }

  return (
    <>
      <h1 id="create-title">Create Listing</h1>

      <div className="create-cont">
        <input
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Description"
          onChange={(e) => setDesc(e.target.value)}
        />
        
        <input
          placeholder="Location"
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          placeholder="Lister"
          onChange={(e) => setOwner(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
        />

         <div className="tags-section">
          <h2>Select Tags (Amenities)</h2>
          <select 
            value={selectedTag} 
            onChange={(e) => setSelectedTag(e.target.value)}>
            <option value="">Select an Amenity</option>
            {Amenities.map((amenity, index) => (
              <option key={index} value={amenity}>{amenity}</option>
            ))}
          </select>

          <button onClick={handleAddTag}>Add Tag</button>
        </div>
        
        <label id="file" htmlFor='file-input'>Upload Image</label>
        <input 
          id="file-input"
          type="file"
          multiple
          style={{display: "none"}}
          onChange={handleImageUpload}
        />

        <div className="contact-info">
          <h2>Contact Information</h2>
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <input
            type="text"
            placeholder="Phone Number"
            onChange={(e) => setPhone(e.target.value)}
          />          
        </div>


      </div>

      <div id="publish">
        <button onClick={publish}>Publish</button>
      </div>

      <div className="preview">
        <h1>Image Preview</h1>
        {images.map((img, i) => (
          <img key={i} src={img} alt={`preview-${i}`} />
        ))}
      </div>
    </>
  );
}
