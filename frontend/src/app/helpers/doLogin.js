export default async function doLogin(email, password) {
  try {
    console.log('Cookies before login:', document.cookie);

    const response = await fetch(`http://localhost:8080/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // important to send cookies
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log('Response data:', data);
    console.log('Cookies after login:', document.cookie);

    if (data.status === "success") {
        setTimeout(async () => {
        try {
            const authResponse = await fetch('http://localhost:8080/api/home', {
            credentials: 'include' // This sends the HTTP-only cookie
             });
            const authData = await authResponse.json();
            console.log('Auth test result:', authData);
            
            if (authData.status === 'success') {
                console.log('Authentication working! User:', authData.user);
            }
        } catch (error) {
        console.error('Auth test failed:', error);
        }
    }, 100);

    window.dispatchEvent(new Event("login"));
    }
    return data;
  } catch (error) {
    console.error("Login failed", error);
    return null;
  }
}
