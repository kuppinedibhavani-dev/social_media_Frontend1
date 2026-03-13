import PageWrapper from "@/components/layout/PageWrapper";
import { useState, useContext, useCallback, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_BACKEND_URL;

interface ScheduledPost {
  id: string;
  content: string;
  platform: string;
  media_url: string | null;
  schedule_time: string;
  status: string;
}

const Scheduler = () => {

  const auth = useContext(AuthContext);
  const token = auth?.token || "";

  const [content, setContent] = useState("");
  const [platform, setPlatform] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");

  const [posts, setPosts] = useState<ScheduledPost[]>([]);

  /* --------------------------- LOAD POSTS --------------------------- */
  const loadPosts = useCallback(async () => {

    if (!token) return;

    try {

      const res = await axios.get(`${API_URL}/posts/list`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setPosts(res.data.posts || []);

    } catch (err) {

      console.error("LOAD POSTS FAILED:", err);
      setPosts([]);

    }

  }, [token]);

  useEffect(() => {
   const fetchPosts = async () => {
    await loadPosts();
  };

  fetchPosts();
  }, [loadPosts]);



  /* --------------------------- CREATE POST --------------------------- */
  const createPost = async (e: React.FormEvent) => {

    e.preventDefault();

    if (!token) {
      toast.error("Please login again");
      return;
    }

    if (!content || !platform) {
      toast.error("Please fill all fields");
      return;
    }

    try {

      const res = await axios.post(
        `${API_URL}/posts/create`,
        {
          content,
          platform,
          schedule_time: scheduleTime || null
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const { message, post } = res.data;

      toast.success(message);

      if (post.status === "scheduled") {
        toast.success("📅 Post scheduled successfully!");
      } else {
        toast.success("🚀 Post published immediately!");
      }

      setContent("");
      setPlatform("");
      setScheduleTime("");

      loadPosts();

    } catch (err) {

      console.error("CREATE POST FAILED:", err);
      toast.error("Failed to create post");

    }

  };


  return (

    <PageWrapper>

      <h1 className="text-3xl font-bold dark:text-white mb-6">
        Scheduler
      </h1>


      {/* --------------------------- FORM --------------------------- */}

      <form
        onSubmit={createPost}
        className="glass-card p-6 rounded-xl space-y-4"
      >

        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="p-2 border rounded w-full"
        >
          <option value="">Select Platform</option>
          <option value="instagram">Instagram</option>
          <option value="facebook">Facebook</option>
          <option value="twitter">Twitter</option>
        </select>


        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write content..."
          className="p-3 border rounded w-full"
          rows={4}
        />


        <input
          type="datetime-local"
          value={scheduleTime}
          onChange={(e) => setScheduleTime(e.target.value)}
          className="p-2 border rounded w-full"
        />


        <button
          type="submit"
          className="bg-blue-600 text-white p-3 rounded w-full"
        >
          Create Scheduled Post
        </button>

      </form>



      {/* --------------------------- POSTS LIST --------------------------- */}

      <h2 className="text-xl font-bold mt-10 mb-4 text-black dark:text-white">
        Your Posts
      </h2>


      <div className="space-y-4">

        {posts.length === 0 && (
          <p className="text-gray-600 dark:text-gray-300">
            No posts yet.
          </p>
        )}


        {posts.map((p) => (

          <div
            key={p.id}
            className="glass-card p-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
          >

            <h3 className="font-semibold text-black dark:text-white capitalize">
              {p.platform}
            </h3>


            <p className="text-gray-700 dark:text-gray-300 mt-1">
              {p.content}
            </p>


            <small className="text-gray-600 dark:text-gray-400 block mt-2">
              Scheduled: {p.schedule_time || "No schedule time"}
            </small>


            <small className="text-gray-600 dark:text-gray-400">
              Status: {p.status}
            </small>

          </div>

        ))}

      </div>

    </PageWrapper>

  );

};

export default Scheduler;