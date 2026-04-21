'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { varesh } from '@/data/varesh';
import { Mail, Phone, Linkedin, Github, Instagram, MapPin } from 'lucide-react';

export function Contact() {
  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      title: 'Email',
      value: varesh.email,
      href: `mailto:${varesh.email}`,
      color: 'text-blue-600'
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: 'Phone',
      value: varesh.phone,
      href: `tel:${varesh.phone.replace(/[^+\d]/g, '')}`,
      color: 'text-green-600'
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: 'Location',
      value: varesh.location,
      href: '#',
      color: 'text-purple-600'
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      title: 'LinkedIn',
      value: 'vareshpatel',
      href: varesh.linkedin,
      color: 'text-blue-700'
    },
    {
      icon: <Github className="h-5 w-5" />,
      title: 'GitHub',
      value: varesh.githubUsername,
      href: varesh.github,
      color: 'text-gray-800'
    },
    {
      icon: <Instagram className="h-5 w-5" />,
      title: 'Resume',
      value: 'Varesh_Resume_ML.pdf',
      href: varesh.resumePath,
      color: 'text-pink-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Get in Touch</h2>
        <p className="text-muted-foreground">
          I&apos;m open to internships, collaborations, and conversations about
          applied AI, computer vision, multimodal tooling, and product-focused ML.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contactInfo.map((contact, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-gray-100 ${contact.color}`}>
                  {contact.icon}
                </div>
                <CardTitle className="text-lg">{contact.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base font-medium mb-3">
                {contact.value}
              </CardDescription>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => window.open(contact.href, '_blank')}
              >
                {contact.title === 'Location' ? 'View on Map' : `Open ${contact.title}`}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center space-y-4 pt-6">
        <div className="bg-accent rounded-lg p-6">
          <h3 className="font-semibold mb-2">What I'm Looking For</h3>
          <p className="text-sm text-muted-foreground">
            {varesh.lookingFor.join(' • ')}
          </p>
        </div>

        <p className="text-sm text-muted-foreground">
          Reach out if you need someone who can move from model work into actual
          product delivery instead of stopping at a notebook or benchmark.
        </p>
      </div>
    </div>
  );
}
