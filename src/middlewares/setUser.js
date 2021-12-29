const setUser = (type) => async (req, res, next) => {
  if (type == 1) {
    // req.user = {
    //     "_id": "6076cfa408541e2ba057e343",
    //     "name": "Akid",
    //     "email": "akid100@gmail.com"
    // }

    req.user = {
      _id: '6076cfa408541e2ba057e331',
      name: 'Rafsani',
      type: 'buyer',
      description: 'My name is Syed',
      whatsapp: '01961145454',
      joinDate: '2021-10-17T10:02:57.137Z',
      email: 'rafsani786@gmail.com',
      bkash: '01961145454',
      rating: 0,
      isPopular: false,
      longDescription:
        "If you're looking for random paragraphs, you've come to the right place. When a random word or a random sentence isn't quite enough, the next logical step is to find a random paragraph. We created the Random Paragraph Generator with you in mind. The process is quite simple. Choose the number of random paragraphs you'd like to see and click the button. Your chosen number of paragraphs will instantly appear.",
      projectDescriptions: [],
      projectPrice: [],
    };
  } else {
    req.user = {
      uid: 'hJPxR6lZ9ohO2yeDRecB52AJGIf1',
      email: 'rafsani786@gmail.com',
      emailVerified: true,
      displayName: 'shw arup',
      isAnonymous: false,
      photoURL:
        'https://lh3.googleusercontent.com/a/AATXAJx47a6lXNvOlKpJw8Dk-3Sy6NaVM-lw5sumvmsR=s96-c',
      providerData: [
        {
          providerId: 'google.com',
          uid: '100261839498154755166',
          displayName: 'shw arup',
          email: 'shwarup101@gmail.com',
          phoneNumber: null,
          photoURL:
            'https://lh3.googleusercontent.com/a/AATXAJx47a6lXNvOlKpJw8Dk-3Sy6NaVM-lw5sumvmsR=s96-c',
        },
      ],
      stsTokenManager: {
        refreshToken:
          'ACzBnChynceyeZjRZM4R4RsVnZK0cnTuuOjteFPCU2cFoAYUd8rJ0ayiGqs65TFRDjqQxskPE7TWYP79YBOza6nT2V0s6Tp2lk-9hdSuoYIo-1cR9t2wvec4pYT8Ry8uEOk72Dx8480XWK48aONgS5AxOlE59MulnSI4k-ubw0oEgsIP1dA-tjWIqFwToSPMn1FtpUL37Se5hqYB9c9lszs7zHnwpILYJ4qMlPJAb1J22ih3v-lJWNl8yiZhz_4H_c092oPjV6G2qYKQjcqd1csyRzFbnsHH-wiUGnPOsMMLpE6JmmmCyKwgXtFxX0O1FujIeh2GKikzxa_YhZmMiB3DuRq6gjpIzw2SJzq0g7qvVDVAcgNp1-d14gCFyt905meQiWW9LR_2pigTpkl1IhzuiUO7gk1Lrdj9LUrO1KuG97MrKe9QwXs',
        accessToken:
          'eyJhbGciOiJSUzI1NiIsImtpZCI6IjM1MDM0MmIwMjU1MDAyYWI3NWUwNTM0YzU4MmVjYzY2Y2YwZTE3ZDIiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoic2h3IGFydXAiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFUWEFKeDQ3YTZsWE52T2xLcEp3OERrLTNTeTZOYVZNLWx3NXN1bXZtc1I9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbGFjLXByb2plY3QtMWQ4YTAiLCJhdWQiOiJsYWMtcHJvamVjdC0xZDhhMCIsImF1dGhfdGltZSI6MTYzMzQyNzIyMiwidXNlcl9pZCI6IlV3SVF5REJCNlplSkxjYXhIM1JBb0RZYkNLSzIiLCJzdWIiOiJVd0lReURCQjZaZUpMY2F4SDNSQW9EWWJDS0syIiwiaWF0IjoxNjMzNDI3MjIyLCJleHAiOjE2MzM0MzA4MjIsImVtYWlsIjoic2h3YXJ1cDEwMUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjEwMDI2MTgzOTQ5ODE1NDc1NTE2NiJdLCJlbWFpbCI6WyJzaHdhcnVwMTAxQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.FxHXkuyayToL9cTtLi1-XLXV8LOlE5xAp4suLq2B4fRPxsooCN2S07HqceFukccFjifgbtryOZ11K-aDFL0Fg25bXARFF80xKrdbaDMe7nnqENyGeBieTkKz7p03eY-0LCaSK3wEX3gs-Mqq1r_driGJSqlMwMB9MX2GRLBPfzgIvVjFgRjqEvLInLmzTU6nQTTnqCGSktipmWvbTZD4CQCnJU1b3fB4QNChhLoQ-hgdT5bAUESBAaMpu82N6LHDDUdDaiLdsZwEjFM8D6Zwvn58qmhGdgGsXLX1OrfwQHCrwK1kbgK7ZNboZyj7XGG-tTVF133M9zqNettGuUkYVQ',
        expirationTime: 1633430822149,
      },
      createdAt: '1633427222074',
      lastLoginAt: '1633427222075',
      apiKey: 'AIzaSyAOjNU0FBeJXD75cYE4F_4fhwlNPo2i4eY',
      appName: '[DEFAULT]',
    };
  }

  next();
};

export default setUser;
