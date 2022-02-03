package com.great_team.projects.vol.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.great_team.projects.vol.entity.Vol;
import com.great_team.projects.vol.service.VolService;

@RestController
@RequestMapping("/great_team/vol")
@CrossOrigin
public class VolController {
	
	private VolService volService;
	
	@Autowired
	public VolController(VolService volService) {
		 this.volService =  volService;
	}
	
	@GetMapping("/all")
	public List<Vol> getVolList() {
		return volService.getVolList();
	}
	@GetMapping("/{id}")
	public Optional<Vol> getVolById(@PathVariable("id") String id) {
		return volService.getVolById(id);
	}
	@PostMapping("/nouveau")
	public String postVol(@RequestBody Vol vol) {
		return this.volService.save(vol);
	}
	@PutMapping("/update")
	public String upDateVol(@RequestBody Vol vol) {
		return this.volService.upDate(vol);
	}
	@DeleteMapping("/delete/{id}")
	public String deleteVol(@PathVariable("id") String id) {
		 return this.volService.delete(id);
	}
}