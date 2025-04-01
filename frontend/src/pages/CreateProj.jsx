import React, { useState } from "react";
import {
  FaPlus,
  FaTrash,
  FaGithub,
  FaExternalLinkAlt,
  FaCheck,
  FaChevronDown,
  FaChevronUp,
  FaTimes,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Notification Component
const Notification = ({ message, type = "success", onClose }) => {
  return (
    <div
      className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transition-all duration-300 
        ${
          type === "success"
            ? "bg-green-900 border-green-700"
            : "bg-red-900 border-red-700"
        } 
        text-white flex items-center justify-between`}
    >
      <div className="flex items-center gap-3">
        {type === "success" ? (
          <FaCheck className="text-green-400" />
        ) : (
          <FaTimes className="text-red-400" />
        )}
        <span>{message}</span>
      </div>
      <button onClick={onClose} className="ml-4 hover:text-gray-300">
        <FaTimes />
      </button>
    </div>
  );
};

export default function ProjectUploadForm() {
  const [media, setMedia] = useState([]);
  const [techStack, setTechStack] = useState([]);
  const [sdgs, setSdgs] = useState([]);
  const [teammates, setTeammates] = useState([]);
  const [mentor, setMentor] = useState("");
  const [notification, setNotification] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    github: "",
    hostedLink: "",
    newTeammate: "", // Add this
    newMentor: "", // Add this
    category: "",
  });

  // New state for expandable sections
  const [expandTechStack, setExpandTechStack] = useState(false);
  const [expandSDGs, setExpandSDGs] = useState(false);

  const availableTechStacks = [
    "React",
    "Vue.js",
    "Angular",
    "Svelte",
    "Next.js",
    "Nuxt.js",
    "Tailwind CSS",
    "Bootstrap",
    "Material UI",
    "Chakra UI",

    // Backend Technologies
    "Node.js",
    "Express.js",
    "Django",
    "Flask",
    "Spring Boot",
    "Ruby on Rails",
    "ASP.NET",
    "FastAPI",

    // Programming Languages
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "C#",
    "C++",
    "Go",
    "Rust",
    "Swift",
    "Kotlin",
    "PHP",
    "R",

    // Databases
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "SQLite",
    "Firebase",
    "Cassandra",
    "Redis",
    "Neo4j",
    "DynamoDB",

    // Mobile Development
    "Flutter",
    "React Native",
    "Swift (iOS)",
    "Kotlin (Android)",
    "Ionic",
    "Xamarin",
    "Jetpack Compose",

    // Cloud & DevOps
    "AWS",
    "Azure",
    "Google Cloud",
    "Docker",
    "Kubernetes",
    "Terraform",
    "Jenkins",
    "GitHub Actions",
    "CI/CD",

    // Machine Learning & AI
    "TensorFlow",
    "PyTorch",
    "Scikit-learn",
    "Keras",
    "OpenCV",
    "Hugging Face Transformers",
    "NLTK",

    // Blockchain & Web3
    "Solidity",
    "Ethereum",
    "Hyperledger",
    "Polygon",
    "Web3.js",
    "Hardhat",
    "Truffle",

    // Cybersecurity
    "Metasploit",
    "Wireshark",
    "Burp Suite",
    "Kali Linux",
    "Nmap",
    "OWASP ZAP",

    // Game Development
    "Unity",
    "Unreal Engine",
    "Godot",
    "Three.js",
    "Phaser",

    // Other Technologies
    "GraphQL",
    "REST API",
    "gRPC",
    "RabbitMQ",
    "Kafka",
    "Selenium",
    "Jest",
    "Cypress",
    "OpenAI API",
    "Arduino",
    "Raspberry Pi",
  ];

  const availableSDGs = [
    "No Poverty",
    "Zero Hunger",
    "Good Health and Well-being",
    "Quality Education",
    "Gender Equality",
    "Clean Water and Sanitation",
    "Affordable and Clean Energy",
    "Decent Work and Economic Growth",
    "Industry, Innovation, and Infrastructure",
    "Reduced Inequality",
    "Sustainable Cities and Communities",
    "Responsible Consumption and Production",
    "Climate Action",
    "Life Below Water",
    "Life on Land",
    "Peace, Justice, and Strong Institutions",
    "Partnerships for the Goals",
  ];

  const navigate = useNavigate();

  const handleMediaUpload = (e) => {
    // Add file type validation in handleMediaUpload
    const validTypes = ["image/jpeg", "image/png", "video/mp4"];
    const files = Array.from(e.target.files).filter((file) =>
      validTypes.includes(file.type)
    );

    if (files.length !== e.target.files.length) {
      setNotification({
        message: "Only JPG, PNG, and MP4 files are allowed",
        type: "error",
      });
    }

    setMedia([...media, ...files]);
  };

  const handleRemoveMedia = (index) => {
    setMedia(media.filter((_, i) => i !== index));
  };

  const handleTechStackSelect = (tech) => {
    setTechStack(
      techStack.includes(tech)
        ? techStack.filter((t) => t !== tech)
        : [...techStack, tech]
    );
  };

  const handleSDGSelect = (sdg) => {
    setSdgs(
      sdgs.includes(sdg) ? sdgs.filter((s) => s !== sdg) : [...sdgs, sdg]
    );
  };

  const handleAddTeammate = () => {
    if (form.newTeammate.trim() && !teammates.includes(form.newTeammate)) {
      setTeammates([...teammates, form.newTeammate]);
      setForm({ ...form, newTeammate: "" });
    }
  };

  const handleRemoveTeammate = (index) => {
    setTeammates(teammates.filter((_, i) => i !== index));
  };

  const handleAddMentor = () => {
    if (form.newMentor.trim()) {
      setMentor(form.newMentor);
      setForm({ ...form, newMentor: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.description || media.length === 0) {
      setNotification({
        message:
          "Please fill in all required fields including category and upload at least one media file.",
        type: "error",
      });
      return;
    }

    try {
      // Create FormData object for file uploads
      const formData = new FormData();

      // Append all text fields
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("github", form.github || "");
      formData.append("hostedLink", form.hostedLink || "");
      formData.append("mentor", mentor || "");
      // Append arrays as JSON strings
      formData.append("sdgs", JSON.stringify(sdgs));
      formData.append("teammates", JSON.stringify(teammates));
      formData.append("techStack", JSON.stringify(techStack));
      formData.append("category", form.category);

      // Append each media file
      media.forEach((file) => {
        formData.append("media", file);
      });

      // Debug FormData before sending
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      // Send to backend
      const response = await fetch("http://localhost:5000/api/create", {
        method: "POST",
        body: formData,
        // Don't set Content-Type header - the browser will set it automatically with the correct boundary
      });

      if (!response.ok) {
        console.log("Error:", response.statusText);
      }

      const data = await response.json();

      // Show success notification
      setNotification({
        message: "Your project has been submitted to the Admin. Status Pending",
        type: "success",
      });
      setTimeout(() => {
        navigate("/student/1");
      }, 1500);
    } catch (error) {
      console.error("Submission error:", error);
      setNotification({
        message: "Failed to submit project. Please try again.",
        type: "error",
      });
    } finally {
      // Auto-dismiss notification after 5 seconds
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  // Close notification manually
  const closeNotification = () => {
    setNotification(null);
  };

  // Function to render tech stack or SDGs with expand/collapse
  const renderSelectableList = (
    title,
    availableItems,
    selectedItems,
    onSelectHandler,
    expanded,
    setExpanded,
    selectedColor,
    defaultColor
  ) => {
    const displayedItems = expanded
      ? availableItems
      : availableItems.slice(0, 10);

    return (
      <div className="mt-6">
        <label className="block text-xl mb-2">{title}</label>
        <div className="flex flex-wrap gap-2">
          {displayedItems.map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => onSelectHandler(item)}
              className={`px-3 py-1 rounded-lg transition-all duration-200 ${
                selectedItems.includes(item)
                  ? `${selectedColor} text-black`
                  : `bg-gray-700 border ${defaultColor} hover:bg-gray-600`
              }`}
            >
              {item}
              {selectedItems.includes(item) && (
                <FaCheck className="inline ml-2" />
              )}
            </button>
          ))}
          {!expanded && availableItems.length > 10 && (
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="px-3 py-1 rounded-lg bg-gray-700 border border-gray-500 hover:bg-gray-600 flex items-center gap-2"
            >
              Show More <FaChevronDown />
            </button>
          )}
          {expanded && availableItems.length > 10 && (
            <button
              type="button"
              onClick={() => setExpanded(false)}
              className="px-3 py-1 rounded-lg bg-gray-700 border border-gray-500 hover:bg-gray-600 flex items-center gap-2"
            >
              Show Less <FaChevronUp />
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen px-10 py-16 bg-gray-900 text-white pt-24 relative">
      {/* Notification Component */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}

      <h2 className="text-4xl font-bold font-lilita text-center text-amber-400 mb-8">
        Upload Your Project
      </h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-6xl mx-auto p-8 bg-gray-800 font-smooch font-bold text-xl tracking-wide leading-relaxed rounded-2xl shadow-lg border border-amber-400"
      >
        <div className="grid font-smooch font-bold text-lg grid-cols-2 gap-6">
          <div>
            <label className="block text-xl mb-2">Project Title *</label>
            <input
              type="text"
              className="w-full p-3 bg-gray-700 rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="Enter project title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block  text-xl mb-2">Project Description *</label>
            <textarea
              className="w-full p-3 bg-gray-700 rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-400"
              rows="3"
              placeholder="Enter project description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              required
            ></textarea>
          </div>
        </div>

        {/* Media Upload */}
        <div className="mt-6">
          <label className="block text-xl mb-2">Upload Media *</label>
          <input
            type="file"
            multiple
            className="w-full p-2 bg-gray-700 rounded-xl file:mr-4 file:rounded-full file:border-0 file:bg-amber-400 file:px-4 file:py-2 file:text-sm hover:file:bg-amber-500"
            onChange={handleMediaUpload}
            required
          />
          <div className="flex gap-4 mt-4">
            {media.map((file, index) => (
              <div
                key={index}
                className="relative w-24 h-24 bg-gray-600 flex items-center justify-center rounded-lg overflow-hidden"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt="upload"
                  className="object-cover w-full h-full"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveMedia(index)}
                  className="absolute top-1 right-1 bg-red-500 p-1 rounded-full text-sm hover:bg-red-600"
                >
                  ✖
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Selection with Expand/Collapse */}
        {renderSelectableList(
          "Select Tech Stack",
          availableTechStacks,
          techStack,
          handleTechStackSelect,
          expandTechStack,
          setExpandTechStack,
          "bg-amber-500",
          "border-amber-400"
        )}

        {/* SDG Selection with Expand/Collapse */}
        {renderSelectableList(
          "Select SDGs",
          availableSDGs,
          sdgs,
          handleSDGSelect,
          expandSDGs,
          setExpandSDGs,
          "bg-green-500",
          "border-green-400"
        )}

        {/* Project Category SELEction */}

        <div className="mt-4">
          <h1 className="text-xl font-semibold text-white mb-2">
            Select Project Category
          </h1>
          <select
            className="w-full p-3 border border-blue-400 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
          >
            <option value="">Select a category</option>
            <option value="Game">Game</option>
            <option value="Website">Website</option>
            <option value="Video">Video</option>
            <option value="Documentary">Documentary</option>
            <option value="Digital Art">Digital Art</option>
          </select>
          {form.category && (
            <p className="mt-2 text-lg text-green-600 font-medium">
              Selected Category: {form.category}
            </p>
          )}
        </div>

        {/* Teammates & Mentor */}
        <div className="mt-6 grid grid-cols-2 gap-6">
          <div>
            <label className="block text-xl mb-2">Enter Names of Contributers </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                className="flex-grow p-3 bg-gray-700 rounded-xl"
                placeholder="Note: Name be the username of the contributer"
                value={form.newTeammate}
                onChange={(e) =>
                  setForm({ ...form, newTeammate: e.target.value })
                }
              />
              <button
                type="button"
                onClick={handleAddTeammate}
                className="bg-amber-500 p-3 rounded-lg hover:bg-amber-600"
              >
                <FaPlus />
              </button>
            </div>
            {teammates.length > 0 && (
              <div className="mt-4">
                <h3 className="text-md font-semibold mb-2">Teammates:</h3>
                <div className="flex flex-wrap gap-2">
                  {teammates.map((teammate, index) => (
                    <div
                      key={index}
                      className="bg-gray-700 px-3 py-1 rounded-lg flex items-center gap-2"
                    >
                      {teammate}
                      <button
                        type="button"
                        onClick={() => handleRemoveTeammate(index)}
                        className="text-red-400 hover:text-red-500"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div>
            <label className="block text-xl mb-2">Enter Mentor Name</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                className="flex-grow p-3 bg-gray-700 rounded-xl"
                placeholder="Note: Name should be the username of the mentor"
                value={form.newMentor}
                onChange={(e) =>
                  setForm({ ...form, newMentor: e.target.value })
                }
              />
              <button
                type="button"
                onClick={handleAddMentor}
                className="bg-green-500 p-3 rounded-lg hover:bg-green-600"
              >
                <FaPlus />
              </button>
            </div>
            {mentor && (
              <div className="mt-4">
                <h3 className="text-md font-semibold mb-2">Current Mentor:</h3>
                <div className="bg-gray-700 px-3 py-1 rounded-lg inline-block">
                  {mentor}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional Project Links */}
        <div className="mt-6 grid grid-cols-2 gap-6">
          <div>
            <div className="flex items-center gap-2">
              <FaGithub />
              <label className="block text-xl mb-2">GitHub Repository</label>
            </div>
            <input
              type="url"
              className="w-full p-3 bg-gray-700 rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="Enter GitHub link"
              value={form.github}
              onChange={(e) => setForm({ ...form, github: e.target.value })}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <FaExternalLinkAlt />
              <label className="block text-xl mb-2">Hosted Project Link</label>
            </div>
            <input
              type="url"
              className="w-full p-3 bg-gray-700 rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter hosted project link"
              value={form.hostedLink}
              onChange={(e) => setForm({ ...form, hostedLink: e.target.value })}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8 text-center">
          <button
            type="submit"
            className="bg-green-500 text-black px-10 py-3 rounded-xl text-xl font-bold hover:bg-green-600 transition-colors duration-300 flex items-center justify-center mx-auto gap-3"
          >
            Submit Project <FaCheck />
          </button>
        </div>
      </form>
    </div>
  );
}
