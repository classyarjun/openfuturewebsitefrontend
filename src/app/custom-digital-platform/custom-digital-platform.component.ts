import { Component } from '@angular/core';

@Component({
  selector: 'app-custom-digital-platform',
  templateUrl: './custom-digital-platform.component.html',
  styleUrls: ['./custom-digital-platform.component.css']
})
export class CustomDigitalPlatformComponent {

  sapOfferings = [
    {
      number: 1,
      title: 'Custom Web & Mobile App Development',
      description: 'We specialize in crafting bespoke web and mobile applications designed to meet your specific business needs. Our team develops scalable, high-performance apps that provide seamless user experiences across all platforms and devices. Whether you need a feature-rich website, an intuitive mobile app, or a fully integrated web solution, we ensure that each application is tailored to drive efficiency, enhance user engagement, and support long-term growth for your business.'
    },
    {
      number: 2,
      title: 'E-commerce Solutions',
      description: 'We offer scalable, secure, and customized e-commerce platforms tailored to your business needs. From seamless payment integrations to optimized product management, our solutions are designed to enhance the shopping experience, improve customer retention, and boost conversion rates, helping your business grow in the competitive online marketplace.'
    },
    {
      number: 3,
      title: 'Business Process Automation',
      description: 'Our business process automation services streamline operations, reduce manual tasks, and enhance productivity. By automating workflows like billing, approvals, and CRM systems, we help businesses operate more efficiently, minimize errors, and make better use of their resources, leading to faster decision-making and higher profitability.'
    },
    {
      number: 4,
      title: 'UI/UX Design & Development',
      description: 'Our UI/UX design services focus on creating visually stunning and intuitive interfaces that prioritize user engagement and satisfaction. We design responsive and accessible platforms that provide a seamless experience across all devices. By blending creativity with functionality, we ensure that your digital products captivate users while driving conversions.'
    }
   
    ];
  }