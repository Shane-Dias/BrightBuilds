import React, { useEffect, useState } from "react";
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
import AutoScrollToTop from "../components/AutoScrollToTop";

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
  const [currentUserName, setCurrentUserName] = useState("");
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

  const normalizeName = (value) => value.trim().toLowerCase();

  const addUniqueTeammate = (list, name) => {
    const trimmed = name.trim();
    if (!trimmed) return list;
    const normalized = normalizeName(trimmed);
    if (list.some((item) => normalizeName(item) === normalized)) {
      return list;
    }
    return [...list, trimmed];
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    const fetchUserProfile = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/details/${userId}`
        );
        const data = await res.json();
        if (data?.fullName) {
          setCurrentUserName(data.fullName);
          setTeammates((prev) => addUniqueTeammate(prev, data.fullName));
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

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
    if (!form.newTeammate.trim()) return;
    setTeammates((prev) => addUniqueTeammate(prev, form.newTeammate));
    setForm({ ...form, newTeammate: "" });
  };

  const handleRemoveTeammate = (index) => {
    const teammate = teammates[index];
    if (normalizeName(teammate) === normalizeName(currentUserName)) return;
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
    const userId = localStorage.getItem("userId");

    if (!form.title || !form.description || !form.category || media.length === 0) {
      setNotification({
        message:
          "Please fill in all required fields including category and upload at least one media file.",
        type: "error",
      });
      return;
    }

    const finalTeammates = currentUserName
      ? addUniqueTeammate(teammates, currentUserName)
      : teammates;

    if (finalTeammates.length === 0) {
      setNotification({
        message: "Please add at least one contributor username.",
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
      formData.append("teammates", JSON.stringify(finalTeammates));
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
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/create`, {
        method: "POST",
        body: formData,
       
      });


      if (!response.ok) {
        console.log("Error:", response.statusText);
      } else {
        setNotification({
          message:
            "Your project has been submitted to the Admin. Status Pending",
          type: "success",
        });

        await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/notifications`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sentBy: userId,
            fullName: "ADMIN",
            title: "New Project Submission",
            message: `A new project titled "${form.title}" has been submitted and is pending your review.`,
            type: "projectSubmission",
          }),
        });

        setTimeout(() => {
          navigate(`/student/${userId}`);
        }, 1500);
      }

      // Show success notification
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
    selectedStyle
  ) => {
    const displayedItems = expanded
      ? availableItems
      : availableItems.slice(0, 10);

    return (
      <div className="mt-8">
        <label className="block text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
          {title}
        </label>
        <div className="flex flex-wrap gap-2">
          {displayedItems.map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => onSelectHandler(item)}
              className="px-3 py-1 rounded-lg border text-sm transition-all duration-200"
              style={
                selectedItems.includes(item)
                  ? selectedStyle
                  : {
                      backgroundColor: "var(--bg-tertiary)",
                      borderColor: "var(--border-primary)",
                      color: "var(--text-secondary)",
                    }
              }
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
              className="px-3 py-1 rounded-lg border flex items-center gap-2 text-sm"
              style={{
                backgroundColor: "var(--bg-tertiary)",
                borderColor: "var(--border-accent)",
                color: "var(--text-primary)",
              }}
            >
              Show More <FaChevronDown />
            </button>
          )}
          {expanded && availableItems.length > 10 && (
            <button
              type="button"
              onClick={() => setExpanded(false)}
              className="px-3 py-1 rounded-lg border flex items-center gap-2 text-sm"
              style={{
                backgroundColor: "var(--bg-tertiary)",
                borderColor: "var(--border-accent)",
                color: "var(--text-primary)",
              }}
            >
              Show Less <FaChevronUp />
            </button>
          )}
        </div>
      </div>
    );
  };

  const inputBaseClass =
    "w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] transition-all duration-200 placeholder:text-[var(--text-secondary)]";
  const labelClass = "block text-sm font-semibold mb-2";

  return (
    <div
      className="min-h-screen pt-24 pb-16 px-4 sm:px-6"
      style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
    >
      <AutoScrollToTop />
      {/* Notification Component */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2
            className="text-3xl sm:text-4xl font-bold font-lilita"
            style={{ color: "var(--accent-primary)" }}
          >
            Upload Your Project
          </h2>
          <p className="mt-2 text-sm sm:text-base" style={{ color: "var(--text-secondary)" }}>
            Fill the essentials and submit for review. 
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border shadow-xl p-6 sm:p-8 md:p-10"
          style={{
            backgroundColor: "var(--bg-secondary)",
            borderColor: "var(--border-accent)",
          }}
        >
          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className={labelClass} style={{ color: "var(--text-primary)" }}>
                  Project Title <span style={{ color: "var(--accent-primary)" }}>*</span>
                </label>
                <input
                  type="text"
                  className={inputBaseClass}
                  style={{
                    backgroundColor: "var(--bg-tertiary)",
                    borderColor: "var(--border-accent)",
                    color: "var(--text-primary)",
                  }}
                  placeholder="Enter project title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className={labelClass} style={{ color: "var(--text-primary)" }}>
                  Project Category <span style={{ color: "var(--accent-primary)" }}>*</span>
                </label>
                <select
                  className={inputBaseClass}
                  style={{
                    backgroundColor: "var(--bg-tertiary)",
                    borderColor: "var(--border-accent)",
                    color: "var(--text-primary)",
                  }}
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
              </div>
              <div className="md:col-span-2">
                <label className={labelClass} style={{ color: "var(--text-primary)" }}>
                  Project Description <span style={{ color: "var(--accent-primary)" }}>*</span>
                </label>
                <textarea
                  className={`${inputBaseClass} min-h-[140px]`}
                  style={{
                    backgroundColor: "var(--bg-tertiary)",
                    borderColor: "var(--border-accent)",
                    color: "var(--text-primary)",
                  }}
                  rows="4"
                  placeholder="Summarize your project, goals, and outcomes"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  required
                ></textarea>
              </div>
            </div>

            {/* Media Upload */}
            <div>
              <label className={labelClass} style={{ color: "var(--text-primary)" }}>
                Upload Media <span style={{ color: "var(--accent-primary)" }}>*</span>
              </label>
              <input
                type="file"
                multiple
                accept="image/jpeg,image/png,video/mp4"
                className="w-full rounded-xl border p-2 text-sm file:mr-4 file:rounded-full file:border-0 file:px-4 file:py-2 file:text-sm file:font-semibold file:bg-[var(--accent-primary)] file:text-[var(--bg-primary)] hover:file:bg-[var(--accent-hover)]"
                style={{
                  backgroundColor: "var(--bg-tertiary)",
                  borderColor: "var(--border-accent)",
                  color: "var(--text-primary)",
                }}
                onChange={handleMediaUpload}
                required
              />
              <p className="mt-2 text-xs" style={{ color: "var(--text-secondary)" }}>
                Accepted: JPG, PNG, MP4
              </p>
              <div className="flex flex-wrap gap-3 mt-4">
                {media.map((file, index) => (
                  <div
                    key={index}
                    className="relative w-24 h-24 rounded-lg overflow-hidden border"
                    style={{
                      backgroundColor: "var(--bg-tertiary)",
                      borderColor: "var(--border-primary)",
                    }}
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt="upload"
                      className="object-cover w-full h-full"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveMedia(index)}
                      className="absolute top-1 right-1 p-1 rounded-full text-xs"
                      style={{ backgroundColor: "var(--error)", color: "white" }}
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
              {
                backgroundColor: "var(--accent-primary)",
                borderColor: "var(--accent-primary)",
                color: "var(--bg-primary)",
              }
            )}

        {/* SDG Selection with Expand/Collapse */}
            {renderSelectableList(
              "Select SDGs",
              availableSDGs,
              sdgs,
              handleSDGSelect,
              expandSDGs,
              setExpandSDGs,
              {
                backgroundColor: "var(--amber-primary)",
                borderColor: "var(--amber-primary)",
                color: "var(--bg-primary)",
              }
            )}

            {/* Contributors & Mentor */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass} style={{ color: "var(--text-primary)" }}>
                  Contributors (usernames)
                </label>
                <p className="text-xs mb-2" style={{ color: "var(--text-secondary)" }}>
                  Your username is added automatically.
                </p>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    className={inputBaseClass}
                    style={{
                      backgroundColor: "var(--bg-tertiary)",
                      borderColor: "var(--border-accent)",
                      color: "var(--text-primary)",
                    }}
                    placeholder="Add a collaborator username"
                    value={form.newTeammate}
                    onChange={(e) =>
                      setForm({ ...form, newTeammate: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    onClick={handleAddTeammate}
                    className="p-3 rounded-lg border"
                    style={{
                      backgroundColor: "var(--accent-primary)",
                      borderColor: "var(--accent-primary)",
                      color: "var(--bg-primary)",
                    }}
                  >
                    <FaPlus />
                  </button>
                </div>
                {teammates.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>
                      Contributors
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {teammates.map((teammate, index) => (
                        <div
                          key={index}
                          className="px-3 py-1 rounded-lg flex items-center gap-2 border text-sm"
                          style={{
                            backgroundColor: "var(--bg-tertiary)",
                            borderColor: "var(--border-primary)",
                            color: "var(--text-primary)",
                          }}
                        >
                          {teammate}
                          {normalizeName(teammate) ===
                            normalizeName(currentUserName) && (
                            <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                              (You)
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveTeammate(index)}
                            className="text-xs"
                            style={{ color: "var(--error)" }}
                            aria-label={`Remove ${teammate}`}
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
                <label className={labelClass} style={{ color: "var(--text-primary)" }}>
                  Mentor username
                </label>
                <div className="flex mt-8 items-center gap-2">
                  <input
                    type="text"
                    className={inputBaseClass}
                    style={{
                      backgroundColor: "var(--bg-tertiary)",
                      borderColor: "var(--border-accent)",
                      color: "var(--text-primary)",
                    }}
                    placeholder="Optional mentor username"
                    value={form.newMentor}
                    onChange={(e) =>
                      setForm({ ...form, newMentor: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    onClick={handleAddMentor}
                    className="p-3 rounded-lg border"
                    style={{
                      backgroundColor: "var(--accent-light)",
                      borderColor: "var(--accent-light)",
                      color: "var(--bg-primary)",
                    }}
                  >
                    <FaPlus />
                  </button>
                </div>
                {mentor && (
                  <div className="mt-4">
                    <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>
                      Current Mentor
                    </h3>
                    <div
                      className="px-3 py-1 rounded-lg inline-block border text-sm"
                      style={{
                        backgroundColor: "var(--bg-tertiary)",
                        borderColor: "var(--border-primary)",
                        color: "var(--text-primary)",
                      }}
                    >
                      {mentor}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Project Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2" style={{ color: "var(--text-primary)" }}>
                  <FaGithub />
                  <label className="text-sm font-semibold">GitHub Repository</label>
                  <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                    Optional
                  </span>
                </div>
                <input
                  type="url"
                  className={inputBaseClass}
                  style={{
                    backgroundColor: "var(--bg-tertiary)",
                    borderColor: "var(--border-accent)",
                    color: "var(--text-primary)",
                  }}
                  placeholder="https://github.com/your-repo"
                  value={form.github}
                  onChange={(e) => setForm({ ...form, github: e.target.value })}
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2" style={{ color: "var(--text-primary)" }}>
                  <FaExternalLinkAlt />
                  <label className="text-sm font-semibold">Live Project Link</label>
                  <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                    Optional
                  </span>
                </div>
                <input
                  type="url"
                  className={inputBaseClass}
                  style={{
                    backgroundColor: "var(--bg-tertiary)",
                    borderColor: "var(--border-accent)",
                    color: "var(--text-primary)",
                  }}
                  placeholder="https://yourproject.com"
                  value={form.hostedLink}
                  onChange={(e) => setForm({ ...form, hostedLink: e.target.value })}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2 text-center">
              <button
                type="submit"
                className="px-10 py-3 rounded-xl text-base font-semibold transition-colors duration-300 inline-flex items-center justify-center gap-3"
                style={{
                  backgroundColor: "var(--accent-primary)",
                  color: "var(--bg-primary)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "var(--accent-hover)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "var(--accent-primary)")
                }
              >
                Submit Project <FaCheck />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
