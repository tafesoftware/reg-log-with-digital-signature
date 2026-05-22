import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Dashboard({ token, setToken }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [signature, setSignature] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [editPreview, setEditPreview] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const [userRes, sigRes] = await Promise.allSettled([
          api.get('/auth/me'),
          api.get('/signatures'),
        ]);
        if (userRes.status === 'fulfilled') {
          setUser(userRes.value.data);
          setEditForm({
            firstName: userRes.value.data.firstName,
            lastName: userRes.value.data.lastName,
            department: userRes.value.data.department,
            year: userRes.value.data.year,
          });
        }
        if (sigRes.status === 'fulfilled') setSignature(sigRes.value.data);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [token]);

  function handleEditChange(e) {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  }

  function handleEditFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setEditForm({ ...editForm, profileImage: event.target.result });
      setEditPreview(event.target.result);
    };
    reader.readAsDataURL(file);
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const { data } = await api.put('/auth/me', {
        ...editForm,
        year: Number(editForm.year),
      });
      setUser(data.user);
      setEditing(false);
      setMessage('Profile updated successfully');
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Update failed';
      setMessage(msg);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      await api.delete('/auth/me');
      setToken(null);
      navigate('/login');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Delete failed');
      setDeleting(false);
      setConfirmDelete(false);
    }
  }

  function cancelEdit() {
    setEditForm({
      firstName: user.firstName,
      lastName: user.lastName,
      department: user.department,
      year: user.year,
    });
    setEditing(false);
    setMessage('');
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {message && (
        <div
          className={`p-4 rounded-lg mb-4 text-sm font-medium ${
            message.includes('success')
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {message}
        </div>
      )}

      {user && (
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-700">Profile</h2>
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1.5 rounded transition font-medium"
              >
                Edit
              </button>
            )}
          </div>

          {editing ? (
            <form onSubmit={handleSave} className="space-y-4">
              <div className="flex items-center gap-4 mb-2">
                {(editPreview || editForm.profileImage) && (
                  <img
                    src={editPreview || editForm.profileImage}
                    alt="Preview"
                    className="h-16 w-16 object-cover rounded-full border border-gray-300"
                  />
                )}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Profile Picture</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleEditFile}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={editForm.firstName}
                    onChange={handleEditChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={editForm.lastName}
                    onChange={handleEditChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Department</label>
                <input
                  type="text"
                  name="department"
                  value={editForm.department}
                  onChange={handleEditChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Year</label>
                <select
                  name="year"
                  value={editForm.year}
                  onChange={handleEditChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  {[1, 2, 3, 4, 5, 6].map((y) => (
                    <option key={y} value={y}>Year {y}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-lg text-sm font-medium transition disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-2 rounded-lg text-sm font-medium transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div>
              {user.profileImage && (
                <div className="mb-4">
                  <img
                    src={user.profileImage}
                    alt="Profile"
                    className="h-20 w-20 object-cover rounded-full border border-gray-300"
                  />
                </div>
              )}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Name:</span>
                  <p className="font-medium text-gray-800">{user.firstName} {user.lastName}</p>
                </div>
                <div>
                  <span className="text-gray-500">Email:</span>
                  <p className="font-medium text-gray-800">{user.email}</p>
                </div>
                <div>
                  <span className="text-gray-500">Student ID:</span>
                  <p className="font-medium text-gray-800">{user.studentId}</p>
                </div>
                <div>
                  <span className="text-gray-500">Department:</span>
                  <p className="font-medium text-gray-800">{user.department}</p>
                </div>
                <div>
                  <span className="text-gray-500">Year:</span>
                  <p className="font-medium text-gray-800">{user.year}</p>
                </div>
              </div>
            </div>
          )}

          {!editing && !confirmDelete && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={() => setConfirmDelete(true)}
                className="text-sm text-red-600 hover:text-red-800 font-medium transition"
              >
                Delete Account
              </button>
            </div>
          )}

          {confirmDelete && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-sm text-red-600 mb-3">
                Are you sure? This permanently deletes your account and signature.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition disabled:opacity-50"
                >
                  {deleting ? 'Deleting...' : 'Yes, Delete My Account'}
                </button>
                <button
                  onClick={() => { setConfirmDelete(false); setMessage(''); }}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-2 rounded-lg text-sm font-medium transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
