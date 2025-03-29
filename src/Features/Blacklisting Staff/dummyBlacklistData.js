const blacklistData = [
    { 
        id: 1, name: "John Doe", uin: "UIN123", pan: "PAN456", location: "Mumbai", blacklisted: true, 
        reason: "Fraudulent activity detected", 
        document: "https://example.com/document1.pdf", 
        photo: "https://via.placeholder.com/100",
        status: "Pending"
    },
    { id: 2, name: "Jane Smith", uin: "UIN789", pan: "PAN987", location: "Delhi", blacklisted: false, status: "Not Blacklisted" },
    { 
        id: 3, name: "Rahul Sharma", uin: "UIN555", pan: "PAN222", location: "Pune", blacklisted: true, 
        reason: "Fake identity documents", 
        document: "https://example.com/document2.pdf", 
        photo: "https://via.placeholder.com/100",
        status: "Pending"
    },
    { id: 4, name: "Aisha Khan", uin: "UIN333", pan: "PAN999", location: "Bangalore", blacklisted: false, status: "Not Blacklisted" },
    { 
        id: 5, name: "Vikram Patil", uin: "UIN654", pan: "PAN123", location: "Hyderabad", blacklisted: true, 
        reason: "Previous employment misconduct", 
        document: "https://example.com/document3.pdf", 
        photo: "https://via.placeholder.com/100",
        status: "Pending"
    },
    { id: 6, name: "Neha Kapoor", uin: "UIN777", pan: "PAN654", location: "Chennai", blacklisted: false, status: "Not Blacklisted" },
    { 
        id: 7, name: "Amit Tiwari", uin: "UIN888", pan: "PAN321", location: "Kolkata", blacklisted: true, 
        reason: "Violation of company policies", 
        document: "https://example.com/document4.pdf", 
        photo: "https://via.placeholder.com/100",
        status: "Pending"
    },
    { id: 8, name: "Priya Desai", uin: "UIN999", pan: "PAN741", location: "Ahmedabad", blacklisted: false, status: "Not Blacklisted" },
    { 
        id: 9, name: "Sanjay Gupta", uin: "UIN112", pan: "PAN852", location: "Jaipur", blacklisted: true, 
        reason: "Previous employer complaint", 
        document: "https://example.com/document5.pdf", 
        photo: "https://via.placeholder.com/100",
        status: "Pending"
    },
    { id: 10, name: "Rekha Nair", uin: "UIN223", pan: "PAN963", location: "Surat", blacklisted: false, status: "Not Blacklisted" }
  ];
  
  export default blacklistData;