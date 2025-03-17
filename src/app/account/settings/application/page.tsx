"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function ProposalDetails() {
  const job = {
    title: "Web Scraping Substack + Source Code (Python)",
    category: "Data Extraction",
    posted: "Posted Nov 9, 2024",
    description:
      "I am looking for a freelancer to scrape data from the Substack leaderboards (this is one of them: https://substack.com/leaderboard/technology_PAID). We want to scrape, at one point in time, the name of the top 50 paid Substacks within each leaderboard, the monthly subscription cost, and the annual s...",
    budget: "$250",
    type: "Fixed-price",
  };

  const client = {
    paymentVerified: true,
    rating: 4.9,
    reviews: 53,
    location: "United States",
    startTime: "Starts: May 5, 2024 PM",
    jobsPosted: 61,
    jobsPostedPercentage: "61 jobs posted rate, 1 open job",
    totalSpent: "$135K total spent",
    hires: "96 hires, 6 active",
    avgHourlyRate: "$19.63/hr avg hourly rate paid",
    hours: "2,897 hours",
    memberSince: "Member since Dec 13, 2021",
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
        <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Proposal details</h1>
            <div className="flex gap-2">
              <Button
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => alert("Edit proposal clicked")}
              >
                Edit proposal
              </Button>
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
                onClick={() => alert("Withdraw proposal clicked")}
              >
                Withdraw proposal
              </Button>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Insights</h2>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <p className="text-gray-700">
                  Get daily updates on competing bids, with insights into how
                  your proposal compares.
                </p>
                <Button
                  className="mt-2 bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => alert("Get connects clicked")}
                >
                  Get for 4 Connects
                </Button>
              </div>
              <div className="w-24">
                <img
                  src="/business.svg"
                  alt="Insights Graph"
                  className="w-full h-auto"
                />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Some editing is closed because it’s been more than 6 hours.
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Job details</h2>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-md font-medium">{job.title}</h3>
              <span className="text-lg font-bold">{job.budget}</span>
            </div>
            <div className="flex gap-2 text-sm text-gray-600 mb-2">
              <span className="bg-gray-200 px-2 py-1 rounded">
                {job.category}
              </span>
              <span>{job.posted}</span>
            </div>
            <p className="text-gray-700 mb-4">{job.description}</p>
            <Link href="#" className="text-green-600 hover:underline">
              View job posting
            </Link>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Skills and expertise</h2>
            <p className="text-gray-700">
              Python, Web Scraping, Data Extraction
            </p>
          </div>
        </div>

        <div className="w-full lg:w-80 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4">About the client</h2>
          <div className="flex items-center gap-2 mb-2">
            {client.paymentVerified && (
              <span className="text-green-600">✓ Payment method verified</span>
            )}
          </div>
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-5 h-5",
                    i < Math.floor(client.rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  )}
                />
              ))}
            </div>
            <span className="text-gray-700">
              {client.rating} of {client.reviews} reviews
            </span>
          </div>
          <p className="text-gray-700 mb-2">{client.location}</p>
          <p className="text-gray-700 mb-2">{client.startTime}</p>
          <p className="text-gray-700 mb-2">{client.jobsPosted}</p>
          <p className="text-gray-700 mb-2">{client.jobsPostedPercentage}</p>
          <p className="text-gray-700 mb-2">{client.totalSpent}</p>
          <p className="text-gray-700 mb-2">{client.hires}</p>
          <p className="text-gray-700 mb-2">{client.avgHourlyRate}</p>
          <p className="text-gray-700 mb-2">{client.hours}</p>
          <p className="text-gray-700">{client.memberSince}</p>
        </div>
      </div>
    </div>
  );
}
