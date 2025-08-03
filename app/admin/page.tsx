'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import AdminAuth from '../../components/AdminAuth'

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  sessionId: string;
  fingerprint: string;
  deviceInfo: string;
  createdAt: string;
  updatedAt: string;
}

interface QuizResponse {
  id: string;
  userId: string;
  questionId: string;
  questionTitle: string;
  answer: string;
  timestamp: string;
}

interface UserImage {
  id: string;
  userId: string;
  imagePath: string;
  imageType: string;
  createdAt: string;
}

interface QuizProgress {
  userId: string;
  userName: string;
  userEmail: string;
  totalQuestions: number;
  answeredQuestions: number;
  completionPercentage: number;
  isCompleted: boolean;
  lastAnsweredQuestion: string;
  lastAnsweredTime: string;
}

interface AdminData {
  users: UserData[];
  responses: QuizResponse[];
  images: UserImage[];
}

export default function AdminDashboard() {
  const [data, setData] = useState<AdminData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'users' | 'responses' | 'images' | 'progress'>('users')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/data')
      if (response.ok) {
        const result = await response.json()
        setData(result.data)
      } else {
        setError('Failed to fetch data')
      }
    } catch (error) {
      setError('Error fetching data')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const getDeviceInfo = (deviceInfoString: string) => {
    try {
      const deviceInfo = JSON.parse(deviceInfoString)
      return `${deviceInfo.browser} on ${deviceInfo.os} (${deviceInfo.isMobile ? 'Mobile' : deviceInfo.isTablet ? 'Tablet' : 'Desktop'})`
    } catch {
      return 'Unknown device'
    }
  }

  // Calculate quiz progress for each user
  const calculateQuizProgress = (): QuizProgress[] => {
    if (!data?.users || !data?.responses) return []

    const TOTAL_QUESTIONS = 24 // Based on the quiz structure
    const progressMap = new Map<string, QuizProgress>()

    // Initialize progress for all users
    data.users.forEach(user => {
      progressMap.set(user.id, {
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        totalQuestions: TOTAL_QUESTIONS,
        answeredQuestions: 0,
        completionPercentage: 0,
        isCompleted: false,
        lastAnsweredQuestion: '',
        lastAnsweredTime: ''
      })
    })

    // Group responses by user to find the most recent activity
    const userResponses = new Map<string, QuizResponse[]>()
    data.responses.forEach(response => {
      if (!userResponses.has(response.userId)) {
        userResponses.set(response.userId, [])
      }
      userResponses.get(response.userId)!.push(response)
    })

    // Calculate progress from responses
    userResponses.forEach((responses, userId) => {
      const progress = progressMap.get(userId)
      if (progress) {
        progress.answeredQuestions = responses.length
        progress.completionPercentage = Math.round((progress.answeredQuestions / progress.totalQuestions) * 100)
        progress.isCompleted = progress.answeredQuestions >= progress.totalQuestions
        
        // Find the most recent response
        const mostRecentResponse = responses.reduce((latest, current) => {
          return new Date(current.timestamp) > new Date(latest.timestamp) ? current : latest
        })
        
        progress.lastAnsweredQuestion = mostRecentResponse.questionTitle
        progress.lastAnsweredTime = mostRecentResponse.timestamp
      }
    })

    return Array.from(progressMap.values()).sort((a, b) => b.completionPercentage - a.completionPercentage)
  }

  const quizProgress = calculateQuizProgress()
  const completedUsers = quizProgress.filter(p => p.isCompleted).length
  const incompleteUsers = quizProgress.filter(p => !p.isCompleted).length

  if (loading) {
    return (
      <AdminAuth>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading admin data...</p>
          </div>
        </div>
      </AdminAuth>
    )
  }

  if (error) {
    return (
      <AdminAuth>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={fetchData}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </div>
      </AdminAuth>
    )
  }

  return (
    <AdminAuth>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
            <p className="text-gray-600">View all user data, quiz responses, and uploaded images</p>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg shadow p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Users</h3>
              <p className="text-3xl font-bold text-blue-600">{data?.users?.length || 0}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Responses</h3>
              <p className="text-3xl font-bold text-green-600">{data?.responses?.length || 0}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg shadow p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Images</h3>
              <p className="text-3xl font-bold text-purple-600">{data?.images?.length || 0}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-lg shadow p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quiz Completion</h3>
              <p className="text-3xl font-bold text-orange-600">{completedUsers}/{quizProgress.length}</p>
              <p className="text-sm text-gray-500 mt-1">Completed / Total Users</p>
            </motion.div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'users', label: 'Users', count: data?.users?.length || 0 },
                  { id: 'responses', label: 'Quiz Responses', count: data?.responses?.length || 0 },
                  { id: 'images', label: 'Images', count: data?.images?.length || 0 },
                  { id: 'progress', label: 'Quiz Progress', count: quizProgress.length || 0 }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label} ({tab.count})
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'users' && (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {data?.users?.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.sessionId}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{user.email}</div>
                            <div className="text-sm text-gray-500">{user.phone}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {getDeviceInfo(user.deviceInfo)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(user.createdAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'responses' && (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Question</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Answer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {data?.responses?.map((response) => (
                        <tr key={response.id}>
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">{response.questionTitle}</div>
                            <div className="text-sm text-gray-500">{response.questionId}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {response.answer}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {response.userId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(response.timestamp)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'images' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {data?.images?.map((image) => (
                    <div key={image.id} className="bg-gray-50 rounded-lg p-4">
                      <img 
                        src={image.imagePath} 
                        alt={`User image ${image.id}`}
                        className="w-full h-48 object-cover rounded mb-3"
                        onError={(e) => {
                          e.currentTarget.src = '/images/placeholder.jpg'
                        }}
                      />
                      <div className="text-sm">
                        <p className="font-medium text-gray-900">Type: {image.imageType}</p>
                        <p className="text-gray-500">User: {image.userId}</p>
                        <p className="text-gray-500">{formatDate(image.createdAt)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'progress' && (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Details</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Activity</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {quizProgress.map((progress) => {
                        // Find user details from data
                        const user = data?.users?.find(u => u.id === progress.userId);
                        
                        return (
                          <tr key={progress.userId} className={progress.isCompleted ? 'bg-green-50' : 'bg-white'}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{progress.userName}</div>
                              <div className="text-sm text-gray-500">{progress.userEmail}</div>
                              {user && (
                                <div className="text-sm text-gray-500">{user.phone}</div>
                              )}
                              {progress.isCompleted && (
                                <div className="mt-1">
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Quiz Completed
                                  </span>
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {progress.isCompleted ? (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                  Completed
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                  </svg>
                                  In Progress
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-full bg-gray-200 rounded-full h-2 mr-3">
                                  <div 
                                    className={`h-2 rounded-full ${
                                      progress.isCompleted 
                                        ? 'bg-green-600' 
                                        : progress.completionPercentage > 50 
                                        ? 'bg-blue-600' 
                                        : progress.completionPercentage > 25 
                                        ? 'bg-yellow-600' 
                                        : 'bg-red-600'
                                    }`}
                                    style={{ width: `${progress.completionPercentage}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm font-medium text-gray-900">
                                  {progress.answeredQuestions}/{progress.totalQuestions}
                                </span>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                {progress.completionPercentage}% complete
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="text-sm text-gray-900">{progress.lastAnsweredQuestion}</div>
                              <div className="text-xs text-gray-500">{formatDate(progress.lastAnsweredTime)}</div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Refresh Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center"
          >
            <button
              onClick={fetchData}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Refresh Data
            </button>
          </motion.div>
        </div>
      </div>
    </AdminAuth>
  )
} 